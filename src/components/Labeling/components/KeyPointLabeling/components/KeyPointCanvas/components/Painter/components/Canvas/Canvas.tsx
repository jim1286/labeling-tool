import React, { useEffect, useRef } from 'react';
import { TaskLayer } from '@/interface';
import { Container } from './styles';
import { useCalculateLayerInfo, useDrawCanvas } from '@/hooks';
import useCanvas from './hook';
import { useBoundStore } from '@/store';

interface CanvasProps {
  taskLayer: TaskLayer;
}

const Canvas: React.FC<CanvasProps> = ({ taskLayer }) => {
  const drawCanvas = useDrawCanvas();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawMode = useBoundStore((state) => state.drawMode);
  const imageSize = useBoundStore((state) => state.imageSize);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const isClicked = selectedTaskLayerId === taskLayer.id;
  const {
    scale,
    lineWidth,
    editDataList,
    contextHolder,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
  } = useCanvas(canvasRef, taskLayer.data);
  const { calculateKeyPointLayerInfo } = useCalculateLayerInfo();

  useEffect(() => {
    handleDraw();
  }, [scale, selectedTaskLayerId, taskLayer, editDataList, isClicked, lineWidth]);

  const handleDraw = () => {
    if (!canvasRef.current || imageSize.width === 0) {
      return;
    }

    drawCanvas({
      drawMode: drawMode,
      canvas: canvasRef.current,
      imageSize: imageSize,
      originImageSize: originImageSize,
      taskLayer: taskLayer,
      editDataList: editDataList,
      scale: scale,
      isEditing: isClicked,
      selectedTaskLayerId: selectedTaskLayerId,
      lineWidth: lineWidth,
    });

    if (isClicked) {
      calculateKeyPointLayerInfo([...taskLayer.data, ...editDataList]);
    }
  };

  return (
    <>
      <Container
        ref={canvasRef}
        onMouseMove={isClicked ? handleCanvasMouseMove : undefined}
        onMouseUp={isClicked ? handleCanvasMouseUp : undefined}
        isClicked={isClicked}
      />
      {contextHolder}
    </>
  );
};

export default Canvas;
