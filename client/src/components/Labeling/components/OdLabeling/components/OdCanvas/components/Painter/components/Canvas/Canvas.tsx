import React, { useEffect } from 'react';
import { OdData, TaskLayer } from '@/interface';
import { ObjectDetectionContainer } from './styles';
import { Layer, Rect, Stage } from 'react-konva';
import { RectRender } from './components';
import { useBoundStore } from '@/store';
import { useCalculateLayerInfo } from '@/hooks';
import useCanvas from './hook';
import { LabelingUtil } from '@/utils';

const Canvas: React.FC = () => {
  const {
    scale,
    imageSize,
    hoveringRectangleData,
    selectedDefectType,
    taskLayerList,
    handleMouseDown,
    handleMouseMove,
  } = useCanvas();
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const { calculateODLayerInfo } = useCalculateLayerInfo();

  useEffect(() => {
    const findTaskLayer = taskLayerList.find(
      (taskLayer) => taskLayer.id === selectedTaskLayerId
    );

    if (!findTaskLayer) {
      calculateODLayerInfo(0, 0);
      return;
    }

    const { width, height } = (findTaskLayer.data[0].data as OdData).rectangleData;
    calculateODLayerInfo(width, height);
  }, [selectedTaskLayerId]);

  return (
    <ObjectDetectionContainer>
      <Stage
        width={imageSize.width}
        height={imageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {hoveringRectangleData && selectedDefectType && (
            <Rect
              x={hoveringRectangleData.x * scale}
              y={hoveringRectangleData.y * scale}
              width={hoveringRectangleData.width * scale}
              height={hoveringRectangleData.height * scale}
              fill={LabelingUtil.hexToStringRGB(selectedDefectType.color, '0.2')}
              stroke={selectedDefectType.color}
            />
          )}

          {taskLayerList
            .filter((taskLayer) => !taskLayer.hidden)
            .map((taskLayer: TaskLayer, index: number) => (
              <RectRender
                key={index}
                taskLayer={taskLayer}
                title={taskLayer.defectType.name}
              />
            ))}
        </Layer>
      </Stage>
    </ObjectDetectionContainer>
  );
};

export default Canvas;
