import {
  Coordinates,
  ImageSize,
  KeyPointData,
  TaskLayerData,
} from "@/interface";
import { useBoundStore } from "@/store";

const useCalculateLayerInfo = () => {
  const setLayerInfo = useBoundStore((state) => state.setLayerInfo);

  const calculateODLayerInfo = (width: number, height: number) => {
    const roundedWidth = Math.round(Math.abs(width));
    const roundedHeight = Math.round(Math.abs(height));
    const size = roundedWidth * roundedHeight;

    setLayerInfo({ width: roundedWidth, height: roundedHeight, size });
  };

  const calculateKeyPointLayerInfo = (
    currentDataList: TaskLayerData[],
    hoveringPoint?: Coordinates
  ) => {
    const currentPointList = currentDataList.map(
      (currentData) => (currentData.data as KeyPointData).coordinates
    );

    if (hoveringPoint) {
      currentPointList.push(hoveringPoint);
    }

    const xList = currentPointList.map((currentPoint) => currentPoint[0]);
    const yList = currentPointList.map((currentPoint) => currentPoint[1]);

    if (xList.length + yList.length === 0) {
      return;
    }

    const minX = Math.min(...xList);
    const maxX = Math.max(...xList);
    const minY = Math.min(...yList);
    const maxY = Math.max(...yList);

    const width = Math.round(maxX - minX);
    const height = Math.round(maxY - minY);
    const size = width * height;

    setLayerInfo({ width, height, size });
  };

  const calculateSegmentationLayerInfo = (
    canvas: HTMLCanvasElement,
    originImageSize: ImageSize,
    scale: number
  ) => {
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const originalSize = originImageSize.width * originImageSize.height;
    const sizeScale = imageData.data.length / originalSize / 4;

    let checkSize = 0;
    let minX = canvas.width;
    let maxX = 0;
    let minY = canvas.height;
    let maxY = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i]) {
        checkSize++;

        const x = (i / 4) % canvas.width;
        const y = i / 4 / canvas.width;

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

    const width = checkSize === 0 ? 0 : Math.round(maxX / scale - minX / scale);
    const height =
      checkSize === 0 ? 0 : Math.round(maxY / scale - minY / scale);
    const size = Math.round(checkSize / sizeScale);

    setLayerInfo({ width, height, size });
  };

  return {
    calculateODLayerInfo,
    calculateKeyPointLayerInfo,
    calculateSegmentationLayerInfo,
  };
};

export default useCalculateLayerInfo;
