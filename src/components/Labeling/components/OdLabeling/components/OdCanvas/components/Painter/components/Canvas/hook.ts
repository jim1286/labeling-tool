import { CanvasDataType, TaskActionEnum } from '@/enums';
import { useCalculateLayerInfo } from '@/hooks';
import { RectangleData, Point, TaskLayer, OdData, TaskHistoryLayer } from '@/interface';
import { useBoundStore } from '@/store';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { nanoid } from 'nanoid';
import { useState, useEffect, useRef } from 'react';

const useCanvas = () => {
  const setLayerInfo = useBoundStore((state) => state.setLayerInfo);
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);
  const setTaskUndoLayerList = useBoundStore((state) => state.setTaskUndoLayerList);
  const clearSelectedTaskLayerId = useBoundStore(
    (state) => state.clearSelectedTaskLayerId
  );
  const drawMode = useBoundStore((state) => state.drawMode);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const imageSize = useBoundStore((state) => state.imageSize);
  const scale = useBoundStore((state) => state.scale);
  const taskRedoLayerList = useBoundStore((state) => state.taskRedoLayerList);
  const taskUndoLayerList = useBoundStore((state) => state.taskUndoLayerList);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const firstPoint = useRef<Point | undefined>(undefined);
  const { calculateODLayerInfo } = useCalculateLayerInfo();
  const [hoveringRectangleData, setHoveringRectangleData] = useState<
    RectangleData | undefined
  >(undefined);

  useEffect(() => {
    resetData();
  }, [scale, drawMode]);

  const resetData = () => {
    firstPoint.current = undefined;
    setHoveringRectangleData(undefined);
    setLayerInfo({ width: 0, height: 0, size: 0 });
  };

  const getMousePos = (stage: Stage): Point => {
    return {
      x: stage.getPointerPosition()?.x || 0,
      y: stage.getPointerPosition()?.y || 0,
    };
  };

  const getNewRectangleData = (event: KonvaEventObject<MouseEvent>) => {
    if (!firstPoint.current) {
      return;
    }

    const firstX = Math.round(firstPoint.current.x / scale);
    const firstY = Math.round(firstPoint.current.y / scale);
    const stage = event.target.getStage();

    if (!stage) {
      return;
    }

    const mousePos = getMousePos(stage);
    const secondX = Math.round(mousePos.x / scale);
    const secondY = Math.round(mousePos.y / scale);
    const newWidth = secondX - firstX;
    const newHeight = secondY - firstY;

    if (newWidth === 0 || newHeight === 0) {
      return;
    }

    const newRectangleData: RectangleData = {
      x: firstX,
      y: firstY,
      width: newWidth,
      height: newHeight,
    };

    return newRectangleData;
  };

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (!selectedDefectType) {
      return;
    }

    if (firstPoint.current) {
      endDrawingBox(event);
      return;
    }

    const stage = event.target.getStage();

    if (!stage) {
      return;
    }

    const mousePos = getMousePos(stage);
    firstPoint.current = { x: mousePos.x, y: mousePos.y };
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!selectedDefectType) {
      return;
    }

    const hoveringRectangleData = getNewRectangleData(event);

    if (!hoveringRectangleData) {
      return;
    }

    setHoveringRectangleData(hoveringRectangleData);
    calculateODLayerInfo(hoveringRectangleData.width, hoveringRectangleData.height);
  };

  const endDrawingBox = (event: KonvaEventObject<MouseEvent>) => {
    if (!selectedDefectType) {
      return;
    }

    const newRectangleData = getNewRectangleData(event);

    if (!newRectangleData) {
      return;
    }

    const newIndex =
      taskLayerList.length + taskUndoLayerList.length + taskRedoLayerList.length + 1;

    const minX = Math.min(
      newRectangleData.x,
      newRectangleData.width + newRectangleData.x
    );
    const maxX = Math.max(
      newRectangleData.x,
      newRectangleData.width + newRectangleData.x
    );
    const minY = Math.min(
      newRectangleData.y,
      newRectangleData.height + newRectangleData.y
    );
    const maxY = Math.max(
      newRectangleData.y,
      newRectangleData.height + newRectangleData.y
    );

    const newOdData: OdData = {
      id: nanoid(),
      index: newIndex,
      rectangleData: newRectangleData,
      coordinates: [
        [minX, minY],
        [maxX, maxY],
      ],
    };

    const newTaskLayer: TaskLayer = {
      id: nanoid(),
      defectType: selectedDefectType,
      hidden: false,
      data: [
        {
          data: newOdData,
          type: CanvasDataType.BOX,
        },
      ],
    };

    const newUndoTaskLayer: TaskHistoryLayer = {
      ...newTaskLayer,
      taskAction: TaskActionEnum.CREATE,
    };

    resetData();
    clearSelectedTaskLayerId();
    setTaskLayerList([...taskLayerList, newTaskLayer]);
    setTaskUndoLayerList([...taskUndoLayerList, newUndoTaskLayer]);
  };

  return {
    scale,
    imageSize,
    hoveringRectangleData,
    selectedDefectType,
    taskLayerList,
    handleMouseDown,
    handleMouseMove,
  };
};

export default useCanvas;
