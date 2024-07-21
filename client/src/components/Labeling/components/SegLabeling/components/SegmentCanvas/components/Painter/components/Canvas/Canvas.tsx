import React, { memo, useEffect, useRef } from 'react';
import { TaskLayer } from '@/interface';
import { Container } from './styles';
import { useCalculateLayerInfo, useDrawCanvas } from '@/hooks';
import { useBoundStore } from '@/store';
import { useCanvas, useHoveringSamToCanvas } from './hook';
import { DrawModeEnum, MouseModeEnum } from '@/enums';

interface CanvasProps {
  taskLayer: TaskLayer;
}

const Canvas: React.FC<CanvasProps> = ({ taskLayer }) => {
  const drawCanvas = useDrawCanvas();
  const drawMode = useBoundStore((state) => state.drawMode);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const editDataHistoryList = useBoundStore((state) => state.editDataHistoryList);
  const imageSize = useBoundStore((state) => state.imageSize);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const mouseMode = useBoundStore((state) => state.mouseMode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isClicked = selectedTaskLayerId === taskLayer.id;
  const {
    scale,
    hoveringSamPoint,
    previewSam,
    linePath,
    editDataList,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasMouseLeave,
  } = useCanvas(canvasRef);
  const hoveringSamToCanvas = useHoveringSamToCanvas();
  const { calculateSegmentationLayerInfo } = useCalculateLayerInfo();

  // sam hovering 용도
  useEffect(() => {
    if (!canvasRef.current || !hoveringSamPoint) {
      return;
    }

    hoveringSamToCanvas(
      taskLayer.defectType.color,
      canvasRef.current,
      linePath.current,
      hoveringSamPoint
    );
  }, [scale, hoveringSamPoint, taskLayer.defectType]);

  // 처음에 그리기 & scale 변화에 새로 그리기 용도
  useEffect(() => {
    if (!canvasRef.current || mouseMode === MouseModeEnum.DRAG) {
      return;
    }

    handleDraw(canvasRef.current);

    if (isClicked) {
      calculateSegmentationLayerInfo(canvasRef.current, originImageSize, scale);
    }
  }, [scale, taskLayer, selectedTaskLayerId]);

  // 새로운 editData 용도
  useEffect(() => {
    if (!canvasRef.current || !isClicked) {
      return;
    }

    switch (drawMode) {
      case DrawModeEnum.BRUSH: {
        calculateSegmentationLayerInfo(canvasRef.current, originImageSize, scale);
        break;
      }
      case DrawModeEnum.SAM: {
        if (previewSam) {
          return;
        }

        handleDraw(canvasRef.current);
        break;
      }
    }
  }, [editDataList, previewSam]);

  // 브러쉬 되돌리기 용도
  useEffect(() => {
    if (!canvasRef.current || !isClicked || drawMode !== DrawModeEnum.BRUSH) {
      return;
    }

    handleDraw(canvasRef.current);
    calculateSegmentationLayerInfo(canvasRef.current, originImageSize, scale);
  }, [editDataHistoryList]);

  const handleDraw = async (canvas: HTMLCanvasElement) => {
    if (imageSize.width === 0) {
      return;
    }

    await drawCanvas({
      drawMode: drawMode,
      canvas: canvas,
      imageSize: imageSize,
      originImageSize: originImageSize,
      taskLayer: taskLayer,
      editDataList: editDataList,
      scale: scale,
      isEditing: isClicked,
      selectedTaskLayerId: selectedTaskLayerId,
    });
  };

  return (
    <Container
      ref={canvasRef}
      onMouseMove={isClicked ? handleCanvasMouseMove : undefined}
      onMouseUp={(e) => (isClicked ? handleCanvasMouseUp(e) : undefined)}
      onMouseDown={isClicked ? handleCanvasMouseDown : undefined}
      onMouseLeave={isClicked ? handleCanvasMouseLeave : undefined}
      isClicked={isClicked}
    />
  );
};

export default memo(Canvas);
