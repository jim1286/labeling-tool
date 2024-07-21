import {
  BrushData,
  ImageSize,
  TaskLayer,
  TaskLayerData,
  EncodedData,
  KeyPointData,
  SamData,
  SamPointData,
  SamBoxData,
} from '@/interface';
import { CanvasDataType, DrawModeEnum, SamModeEnum, SamPointTypeEnum } from '@/enums';
import { useCalculateLayerInfo, useDrawDataToCanvas, useSamToCanvas } from '.';
import { LabelingUtil } from '@/utils';

interface Props {
  drawMode: DrawModeEnum;
  canvas: HTMLCanvasElement;
  imageSize: ImageSize;
  originImageSize: ImageSize;
  taskLayer: TaskLayer;
  editDataList: TaskLayerData[];
  scale: number;
  isEditing: boolean;
  selectedTaskLayerId: string | null;
  lineWidth?: number;
}

const useDrawCanvas = () => {
  const {
    drawBoxToCanvas,
    drawPointToCanvas,
    drawBrushToCanvas,
    drawKeyPointToCanvas,
    drawEncodedToCanvas,
  } = useDrawDataToCanvas();
  const { calculateSegmentationLayerInfo } = useCalculateLayerInfo();
  const samToCanvas = useSamToCanvas();

  const drawCanvas = async (props: Props) => {
    const {
      drawMode,
      canvas,
      imageSize,
      originImageSize,
      taskLayer,
      editDataList,
      scale,
      isEditing,
      selectedTaskLayerId,
      lineWidth,
    } = props;
    const drawCanvas = document.createElement('canvas');

    drawCanvas.width = imageSize.width;
    drawCanvas.height = imageSize.height;

    const color = taskLayer.defectType.color;
    const drawCtx = drawCanvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!drawCtx) {
      return;
    }

    const taskLayerDataList = taskLayer.data.flat() as TaskLayerData[];

    if (isEditing) {
      taskLayerDataList.push(...(editDataList as TaskLayerData[]));
    }

    const alpha = isEditing
      ? drawMode === DrawModeEnum.KEY_POINT
        ? 0.7
        : 0.5
      : selectedTaskLayerId
        ? 0.3
        : 0.5;

    if (drawMode === DrawModeEnum.SAM) {
      if (editDataList.length > 0) {
        await samToCanvas(
          'click',
          drawCtx,
          color,
          originImageSize,
          imageSize,
          editDataList
        );
      }

      calculateSegmentationLayerInfo(drawCanvas, originImageSize, scale);
    }

    taskLayerDataList.forEach((taskLayerData, index) => {
      const { type, data } = taskLayerData;

      switch (type) {
        case CanvasDataType.ENCODED: {
          const encodedData = data as EncodedData;

          drawEncodedToCanvas(
            drawCtx,
            color,
            originImageSize,
            imageSize,
            encodedData,
            0.5
          );
          break;
        }
        case CanvasDataType.BRUSH: {
          const brushData = data as BrushData;
          const brushSize = (brushData.lineWidth / brushData.scale) * scale;

          drawBrushToCanvas(
            drawCtx,
            color,
            scale,
            brushSize,
            brushData.brushMode,
            brushData.coordinates,
            alpha
          );
          break;
        }
        case CanvasDataType.KEY_POINT: {
          const keyPointData = data as KeyPointData;
          const prevTaskLayerData =
            index === 0 ? undefined : taskLayerDataList[index - 1];

          drawKeyPointToCanvas(
            drawCtx,
            color,
            scale,
            alpha,
            keyPointData.coordinates,
            lineWidth || 5,
            prevTaskLayerData?.data as KeyPointData | undefined
          );
          break;
        }
        case CanvasDataType.SAM: {
          const samData = data as SamData;

          switch (samData.samMode) {
            case SamModeEnum.POINT: {
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

              const startSamPointData: SamPointData = {
                samPoint: [samBoxData.startPoint[0], samBoxData.startPoint[1]],
                samPointType: SamPointTypeEnum.POSITIVE,
              };
              const endSamPointData: SamPointData = {
                samPoint: [samBoxData.endPoint[0], samBoxData.endPoint[1]],
                samPointType: SamPointTypeEnum.POSITIVE,
              };
              drawPointToCanvas(drawCtx, color, scale, startSamPointData);
              drawPointToCanvas(drawCtx, color, scale, endSamPointData);
              break;
            }
          }
          break;
        }
      }
    });

    LabelingUtil.putDrawCanvasToCanvas(canvas, drawCanvas);
  };

  return drawCanvas;
};

export default useDrawCanvas;
