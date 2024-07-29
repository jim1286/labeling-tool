import { TaskLayer, DefectType, ResizeImageInfo } from "@/interface";
import { defectTypeColors } from "@/theme/color";
import { nanoid } from "nanoid";

export const convertMaskDataToImageData = (
  maskData: number[],
  width: number,
  height: number,
  hexList: string[]
) => {
  const imageData = new ImageData(width, height);
  const rgbList = hexList.map((hex) => convertHexToRgb(hex));

  for (let i = 0; i < maskData.length; i++) {
    if (!maskData[i]) {
      continue;
    }

    const segmentIndex = maskData[i] - 1;

    imageData.data[4 * i + 0] = rgbList[segmentIndex][0];
    imageData.data[4 * i + 1] = rgbList[segmentIndex][1];
    imageData.data[4 * i + 2] = rgbList[segmentIndex][2];
    imageData.data[4 * i + 3] = 128;
  }

  return imageData;
};

export const convertImageDataToMaskData = (
  imageData: ImageData,
  defectTypeNumber: number
) => {
  const newMaskData = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i]) {
      newMaskData.push(defectTypeNumber);
      continue;
    }
    newMaskData.push(0);
  }

  return newMaskData;
};

export const convertHexToRgb = (hex?: string) => {
  if (!hex) {
    return [0, 0, 0];
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
};

export const getResizeInfo = (
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number
): ResizeImageInfo => {
  const imageRatio = imageWidth / imageHeight; // 이미지의 가로세로 비율
  const canvasRatio = canvasWidth / canvasHeight; // 캔버스의 가로세로 비율
  let reWidth = 0;
  let reHeight = 0;
  let scale = 0;

  if (imageRatio > canvasRatio) {
    // 이미지가 더 넓은 형태
    reWidth = canvasWidth; // 너비를 캔버스 너비에 맞춤
    reHeight = reWidth / imageRatio; // 높이를 비율에 맞게 조정
    scale = reHeight / imageHeight; // 높이를 기준으로 크기 비율 계산
  } else {
    // 이미지가 더 높은 형태
    reHeight = canvasHeight; // 높이를 캔버스 높이에 맞춤
    reWidth = reHeight * imageRatio; // 너비를 비율에 맞게 조정
    scale = reWidth / imageWidth; // 너비를 기준으로 크기 비율 계산
  }

  return {
    width: reWidth,
    height: reHeight,
    scale,
  };
};

export const getDefectTypeNumberList = (maskData: number[]) => {
  const set = new Set(maskData);
  set.delete(0);

  return Array.from(set);
};

export const getNewTaskLayer = (defectType: DefectType): TaskLayer => {
  return {
    id: nanoid(),
    defectType: defectType,
    data: [],
    hidden: false,
  };
};

export const putImageDataToCanvas = (imageData: ImageData) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = imageData.width;
  canvas.height = imageData.height;

  if (!ctx) {
    return;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

export const putDrawCanvasToCanvas = (
  canvas: HTMLCanvasElement,
  drawCanvas: HTMLCanvasElement
) => {
  canvas.width = drawCanvas.width;
  canvas.height = drawCanvas.height;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!ctx) {
    return;
  }

  ctx.drawImage(drawCanvas, 0, 0);
};

export const hexToStringRGB = (hex: string, alpha: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

export const hexToAntdPrestColor = (hex?: string) => {
  if (!hex) {
    return undefined;
  }

  for (const color in defectTypeColors) {
    if (defectTypeColors[color] === hex) {
      return color;
    }
  }
  return undefined;
};
