import {
  CanvasDataType,
  DrawModeEnum,
  MouseModeEnum,
  SamModeEnum,
  SamPointTypeEnum,
} from '@/enums';
import {
  useCalculateLayerInfo,
  useDrawDataToCanvas,
  useKeyDown,
  useKeyUp,
  useSamToCanvas,
  useSleep,
} from '@/hooks';
import {
  BrushData,
  SamPointData,
  EditData,
  SamData,
  SamBoxData,
  DefectType,
} from '@/interface';
import { useBoundStore } from '@/store';
import { LabelingUtil } from '@/utils';
import { Coordinates } from '@engine-app/types';
import { throttle } from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const setIsDrawing = useBoundStore((state) => state.setIsDrawing);
  const setEditDataList = useBoundStore((state) => state.setEditDataList);
  const clearEditDataHistoryList = useBoundStore(
    (state) => state.clearEditDataHistoryList
  );
  const editDataList = useBoundStore((state) => state.editDataList);
  const drawMode = useBoundStore((state) => state.drawMode);
  const brushMode = useBoundStore((state) => state.brushMode);
  const samMode = useBoundStore((state) => state.samMode);
  const mouseMode = useBoundStore((state) => state.mouseMode);
  const brushSize = useBoundStore((state) => state.brushSize);
  const scale = useBoundStore((state) => state.scale);
  const isDrawing = useBoundStore((state) => state.isDrawing);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const linePath = useRef<Coordinates[]>([]);
  const isOnRange = useRef(true);
  const [previewSam, setPreviewSam] = useState<boolean>(false);
  const [hoveringSamPoint, setHoveringSamPoint] = useState<Coordinates | undefined>(
    undefined
  );
  const { drawBrushToCanvas } = useDrawDataToCanvas();

  const getCurrentPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xPosition = e.clientX - rect.left;
    const yPosition = e.clientY - rect.top;

    const lineX = xPosition / scale;
    const lineY = yPosition / scale;
    const point: Coordinates = [lineX, lineY];

    return point;
  };

  const drawBrush = useMemo(
    () =>
      throttle((ctx: CanvasRenderingContext2D, selectedDefectType: DefectType) => {
        drawBrushToCanvas(
          ctx,
          selectedDefectType.color,
          scale,
          brushSize,
          brushMode,
          linePath.current,
          0.5
        );
      }, 10),
    [scale, selectedDefectType, brushSize, brushMode]
  );

  const throttleDrawBrush = useCallback(
    (currentPoint?: Coordinates) => {
      if (!canvasRef.current) {
        return;
      }

      const ctx = canvasRef.current.getContext('2d', {
        willReadFrequently: true,
      });

      if (!ctx || !selectedDefectType) {
        return;
      }

      if (currentPoint) {
        linePath.current.push(currentPoint);
      } else {
        linePath.current.push([
          linePath.current[0][0] + 0.01,
          linePath.current[0][1] + 0.01,
        ]);
      }

      drawBrush(ctx, selectedDefectType);
    },
    [drawBrush]
  );

  const hoverSamPoint = useMemo(
    () =>
      throttle((currentPoint: Coordinates) => {
        setHoveringSamPoint(currentPoint);
      }, 10),
    [scale, selectedDefectType, brushSize, brushMode]
  );

  const throttleSamPoint = useCallback(
    (currentPoint: Coordinates) => {
      hoverSamPoint(currentPoint);
    },
    [hoverSamPoint]
  );

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mouseMode === MouseModeEnum.DRAG) {
      return;
    }

    setIsDrawing(true);

    const currentPoint: Coordinates = getCurrentPoint(e);
    linePath.current.push(currentPoint);

    switch (drawMode) {
      case DrawModeEnum.SAM: {
        switch (samMode) {
          case SamModeEnum.BOX: {
            if (isDrawing) {
              setIsDrawing(false);
              return;
            }

            const boxIndex = editDataList.findIndex(
              (editData) => (editData.data as SamData).samMode === SamModeEnum.BOX
            );

            if (boxIndex === -1) {
              return;
            }

            const newEditList = [...editDataList];
            newEditList.splice(boxIndex, 1);
            setEditDataList([...newEditList]);
            break;
          }
        }
        break;
      }
      case DrawModeEnum.BRUSH: {
        throttleDrawBrush();
        break;
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isOnRange.current) {
      isOnRange.current = true;

      if (drawMode === DrawModeEnum.BRUSH) {
        handleCanvasMouseUp(e);
        return;
      }
    }

    if (mouseMode === MouseModeEnum.DRAG) {
      handleCanvasMouseUp(e);
      return;
    }

    const currentPoint: Coordinates = getCurrentPoint(e);

    switch (drawMode) {
      case DrawModeEnum.SAM: {
        switch (samMode) {
          case SamModeEnum.POINT: {
            if (editDataList.length > 0 && !previewSam) {
              return;
            }

            throttleSamPoint(currentPoint);
            break;
          }
          case SamModeEnum.BOX: {
            if (isDrawing) {
              throttleSamPoint(currentPoint);
              break;
            }

            if (editDataList.length > 0 || !canvasRef.current) {
              break;
            }

            const ctx = canvasRef.current.getContext('2d');

            if (!ctx) {
              break;
            }

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            break;
          }
        }
        break;
      }
      case DrawModeEnum.BRUSH: {
        if (!isDrawing) {
          return;
        }

        throttleDrawBrush(currentPoint);
        break;
      }
    }
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (linePath.current.length === 0) {
      setIsDrawing(false);
      return;
    }

    switch (drawMode) {
      case DrawModeEnum.BRUSH: {
        const newBrushData: BrushData = {
          id: nanoid(),
          scale: scale,
          lineWidth: brushSize,
          coordinates: [...linePath.current],
          brushMode: brushMode,
        };

        const newEditData: EditData = {
          type: CanvasDataType.BRUSH,
          data: newBrushData,
        };

        setEditDataList([...editDataList, newEditData]);
        break;
      }
      case DrawModeEnum.SAM: {
        const samPointType =
          e.button === 0 ? SamPointTypeEnum.POSITIVE : SamPointTypeEnum.NEGATIVE;
        const startPoint: Coordinates = [linePath.current[0][0], linePath.current[0][1]];
        const currentPoint: Coordinates = getCurrentPoint(e);

        switch (samMode) {
          case SamModeEnum.POINT: {
            const newSamPointData: SamPointData = {
              samPoint: currentPoint,
              samPointType,
            };
            const newSamData: SamData = {
              id: nanoid(),
              samMode: samMode,
              data: newSamPointData,
            };

            const newEditData: EditData = {
              type: CanvasDataType.SAM,
              data: newSamData,
            };

            setEditDataList([...editDataList, newEditData]);
            break;
          }
          case SamModeEnum.BOX: {
            if (isDrawing) {
              return;
            }

            const newSamBoxData: SamBoxData = {
              startPoint,
              endPoint: currentPoint,
              width: currentPoint[0] - startPoint[0],
              height: currentPoint[1] - startPoint[1],
            };
            const newSamData: SamData = {
              id: nanoid(),
              samMode: samMode,
              data: newSamBoxData,
            };

            const newEditData: EditData = {
              type: CanvasDataType.SAM,
              data: newSamData,
            };

            setEditDataList([...editDataList, newEditData]);
            break;
          }
        }
        break;
      }
    }

    resetCanvasState();
  };

  const resetCanvasState = () => {
    linePath.current = [];
    setIsDrawing(false);
    clearEditDataHistoryList();
    setHoveringSamPoint(undefined);
  };

  const handleCanvasMouseLeave = () => {
    isOnRange.current = false;
  };

  useKeyDown(() => {
    if (samMode === SamModeEnum.POINT) {
      setPreviewSam(true);
    }
  }, ['ShiftLeft']);

  useKeyUp(async () => {
    if (samMode === SamModeEnum.POINT) {
      await useSleep(50);
      setPreviewSam(false);
    }
  }, ['ShiftLeft']);

  return {
    scale,
    hoveringSamPoint,
    previewSam,
    linePath,
    editDataList,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasMouseLeave,
  };
};

export const useHoveringSamToCanvas = () => {
  const samToCanvas = useSamToCanvas();
  const scale = useBoundStore((state) => state.scale);
  const samMode = useBoundStore((state) => state.samMode);
  const imageSize = useBoundStore((state) => state.imageSize);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const editDataList = useBoundStore((state) => state.editDataList);
  const { drawBoxToCanvas, drawPointToCanvas } = useDrawDataToCanvas();
  const { calculateSegmentationLayerInfo } = useCalculateLayerInfo();

  const hoveringSamToCanvas = async (
    color: string,
    canvas: HTMLCanvasElement,
    linePath: Coordinates[],
    hoveringSamPoint: Coordinates
  ) => {
    const drawCanvas = document.createElement('canvas');

    drawCanvas.width = imageSize.width;
    drawCanvas.height = imageSize.height;

    const drawCtx = drawCanvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!drawCtx) {
      return;
    }

    let newSamData: SamData;

    switch (samMode) {
      case SamModeEnum.POINT: {
        const newSamPointData = {
          samPoint: hoveringSamPoint,
          samPointType: SamPointTypeEnum.POSITIVE,
        };

        newSamData = {
          id: nanoid(),
          samMode: samMode,
          data: newSamPointData,
        };
        break;
      }
      case SamModeEnum.BOX: {
        if (linePath.length === 0) {
          return;
        }

        const x = linePath[0][0];
        const y = linePath[0][1];

        const newSamBoxData: SamBoxData = {
          startPoint: [x, y],
          endPoint: [...hoveringSamPoint],
          width: hoveringSamPoint[0] - x,
          height: hoveringSamPoint[1] - y,
        };

        newSamData = {
          id: nanoid(),
          samMode: samMode,
          data: newSamBoxData,
        };
        break;
      }
    }

    const newEditData: EditData = {
      type: CanvasDataType.SAM,
      data: newSamData,
    };
    const newEditDataList = [...editDataList].concat(newEditData);

    await samToCanvas(
      'hover',
      drawCtx,
      color,
      originImageSize,
      imageSize,
      newEditDataList
    );

    calculateSegmentationLayerInfo(drawCanvas, originImageSize, scale);

    newEditDataList.forEach((newEditData, index) => {
      const samData = newEditData.data as SamData;
      const samDataMode = samData.samMode;

      switch (samDataMode) {
        case SamModeEnum.POINT: {
          if (samMode === SamModeEnum.POINT && index === newEditDataList.length - 1) {
            break;
          }

          const samPointData = samData.data as SamPointData;

          drawPointToCanvas(drawCtx, color, scale, samPointData);
          break;
        }
        case SamModeEnum.BOX: {
          const samBoxData = samData.data as SamBoxData;

          drawBoxToCanvas(
            drawCtx,
            color,
            scale,
            samBoxData.startPoint[0],
            samBoxData.startPoint[1],
            samBoxData.width,
            samBoxData.height
          );

          const startSamPoint: SamPointData = {
            samPoint: [samBoxData.startPoint[0], samBoxData.startPoint[1]],
            samPointType: SamPointTypeEnum.POSITIVE,
          };
          const endSamPoint: SamPointData = {
            samPoint: [samBoxData.endPoint[0], samBoxData.endPoint[1]],
            samPointType: SamPointTypeEnum.POSITIVE,
          };
          drawPointToCanvas(drawCtx, color, scale, startSamPoint);
          drawPointToCanvas(drawCtx, color, scale, endSamPoint);
          break;
        }
      }
    });

    LabelingUtil.putDrawCanvasToCanvas(canvas, drawCanvas);
  };

  return hoveringSamToCanvas;
};
