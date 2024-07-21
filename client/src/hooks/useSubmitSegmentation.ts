import { CanvasDataType, BrushModeEnum } from '@/enums';
import { BrushData, ImageSize, TaskLayer } from '@/interface';
import { useBoundStore } from '@/store';
import { DecodeUtil, EncodeUtil, LabelingUtil } from '@/utils';

const useSubmitSegmentation = () => {
  const originImageSize = useBoundStore((state) => state.originImageSize);

  const convertSegmentData = (taskLayerList: TaskLayer[]) => {
    const width = originImageSize.width;
    const height = originImageSize.height;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', {
      willReadFrequently: true,
    });
    const bboxList: number[][] = [];
    const maskDataList: number[][] = [];

    canvas.width = width;
    canvas.height = height;

    taskLayerList.forEach((taskLayer, index) => {
      const { data } = taskLayer;
      const maskData: number[] = Array(width * height).fill(0);

      data.forEach((taskLayerData) => {
        const { type, data } = taskLayerData;

        switch (type) {
          case CanvasDataType.ENCODED: {
            const newMaskData = Array(width * height).fill(0);

            DecodeUtil.decodeMaskData(newMaskData, JSON.parse(data as string), index + 1);
            mergeMaskData(maskData, newMaskData);
            break;
          }
          case CanvasDataType.BRUSH: {
            const linePath = data as BrushData;

            if (!ctx) {
              return;
            }

            ctx.clearRect(0, 0, width, height);

            const lineContext = drawContext(linePath, ctx);
            const imageData = lineContext.getImageData(0, 0, width, height);
            const newMaskData = LabelingUtil.convertImageDataToMaskData(
              imageData,
              index + 1
            );

            if (linePath.brushMode === BrushModeEnum.PAINT) {
              mergeMaskData(maskData, newMaskData);
            }

            if (linePath.brushMode === BrushModeEnum.ERASE) {
              eraseMaskData(maskData, newMaskData);
            }

            break;
          }
        }
      });

      bboxList.push(getSegBBox(originImageSize, maskData));
      maskDataList.push(maskData);
    });

    const mergedMaskData: number[] = Array(width * height).fill(0);

    maskDataList.forEach((maskData) => {
      mergeMaskData(mergedMaskData, maskData);
    });

    const uniqueArray = Array.from(new Set(mergedMaskData)).sort((a, b) => a - b);

    return {
      bboxList: bboxList.filter((_, index) => uniqueArray.includes(index + 1)),
      uniqueArray,
      encodedMergedMaskData: EncodeUtil.encode(mergedMaskData),
    };
  };

  const drawContext = (linePath: BrushData, context: CanvasRenderingContext2D) => {
    context.strokeStyle = 'rgb(10,0,0)';
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = linePath.lineWidth / linePath.scale;
    context.beginPath();

    const coordinates = linePath.coordinates;

    if (coordinates.length > 0) {
      context.moveTo(coordinates[0][0], coordinates[0][1]);

      for (let i = 1; i < coordinates.length; i++) {
        context.lineTo(coordinates[i][0], coordinates[i][1]);
      }
    }

    context.stroke();
    context.closePath();

    return context;
  };

  const mergeMaskData = (maskData: number[], newMaskData: number[]) => {
    if (maskData.length === 0) {
      maskData = newMaskData;
      return;
    }

    newMaskData.forEach((newMask, index) => {
      if (newMask) {
        maskData[index] = newMask;
      }
    });
  };

  const eraseMaskData = (maskData: number[], newMaskData: number[]) => {
    if (maskData.length === 0) {
      maskData = [];
      return;
    }

    newMaskData.forEach((newMask, index) => {
      if (newMask) {
        maskData[index] = 0;
      }
    });
  };

  const getSegBBox = (originImageSize: ImageSize, mergedMaskData: number[]) => {
    let minX = originImageSize.width;
    let maxX = 0;
    let minY = originImageSize.height;
    let maxY = 0;

    for (let i = 0; i < mergedMaskData.length; i++) {
      if (mergedMaskData[i]) {
        const x = i % originImageSize.width;
        const y = i / originImageSize.width;

        if (x < minX) {
          minX = x;
        }

        if (x > maxX) {
          maxX = x;
        }

        if (y < minY) {
          minY = y;
        }

        if (y > maxY) {
          maxY = y;
        }
      }
    }

    return [minX, minY, maxX, maxY].map((ele) => Math.round(ele));
  };

  return convertSegmentData;
};

export default useSubmitSegmentation;
