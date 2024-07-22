import { BrushModeEnum, SamPointTypeEnum } from "@/enums";
import {
  SamPointData,
  KeyPointData,
  ImageSize,
  Coordinates,
} from "@/interface";
import { SamService } from "@/services";
import { DecodeUtil, LabelingUtil } from "@/utils";

const useDrawDataToCanvas = () => {
  const drawBrushToCanvas = (
    ctx: CanvasRenderingContext2D,
    color: string,
    scale: number,
    brushSize: number,
    brushMode: BrushModeEnum,
    coordinates: Coordinates[],
    alphaScale: number
  ) => {
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = brushSize;

    if (brushMode === BrushModeEnum.PAINT) {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();

      if (coordinates.length > 0) {
        ctx.moveTo(coordinates[0][0] * scale, coordinates[0][1] * scale);

        for (let i = 1; i < coordinates.length; i++) {
          ctx.lineTo(coordinates[i][0] * scale, coordinates[i][1] * scale);
        }
      }

      ctx.stroke();
      ctx.closePath();
    }

    ctx.globalAlpha = brushMode === BrushModeEnum.PAINT ? alphaScale : 1;
    ctx.globalCompositeOperation =
      brushMode === BrushModeEnum.PAINT ? "source-over" : "destination-out";

    ctx.beginPath();

    if (coordinates.length > 0) {
      ctx.moveTo(coordinates[0][0] * scale, coordinates[0][1] * scale);

      for (let i = 1; i < coordinates.length; i++) {
        ctx.lineTo(coordinates[i][0] * scale, coordinates[i][1] * scale);
      }
    }

    ctx.stroke();
    ctx.closePath();
  };

  const drawSamToCanvas = async (
    ctx: CanvasRenderingContext2D,
    color: string,
    imageSize: ImageSize,
    canvasSize: ImageSize,
    samPointList: number[][],
    samPointTypeList: SamPointTypeEnum[],
    samBoxPoint: number[][]
  ) => {
    const samUint8ClampedArray = await SamService.postRunSam({
      points: samPointList,
      point_labels: samPointTypeList,
      box: samBoxPoint,
      width: imageSize.width,
      height: imageSize.height,
      color: [...LabelingUtil.convertHexToRgb(color), 128],
    });

    console.log(samUint8ClampedArray);
    const samImageData = new ImageData(
      samUint8ClampedArray.data!,
      imageSize.width,
      imageSize.height
    );

    const imageCanvas = LabelingUtil.putImageDataToCanvas(samImageData);

    if (!imageCanvas) {
      return;
    }

    ctx.drawImage(
      imageCanvas,
      0,
      0,
      imageSize.width,
      imageSize.height,
      0,
      0,
      canvasSize.width,
      canvasSize.height
    );
  };

  const drawBoxToCanvas = (
    ctx: CanvasRenderingContext2D,
    color: string,
    scale: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.setLineDash([10, 15]);
    ctx.rect(x * scale, y * scale, width * scale, height * scale);
    ctx.stroke();
  };

  const drawPointToCanvas = (
    ctx: CanvasRenderingContext2D,
    color: string,
    scale: number,
    data: SamPointData
  ) => {
    ctx.strokeStyle =
      data.samPointType === SamPointTypeEnum.POSITIVE ? color : "white";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 20;

    ctx.beginPath();

    ctx.moveTo(data.samPoint[0] * scale, data.samPoint[1] * scale);
    ctx.lineTo(
      (data.samPoint[0] + 0.1) * scale,
      (data.samPoint[1] + 0.1) * scale
    );

    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle =
      data.samPointType === SamPointTypeEnum.POSITIVE ? "white" : color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 9;

    ctx.beginPath();

    ctx.moveTo(data.samPoint[0] * scale, data.samPoint[1] * scale);
    ctx.lineTo(
      (data.samPoint[0] + 0.1) * scale,
      (data.samPoint[1] + 0.1) * scale
    );

    ctx.stroke();
    ctx.closePath();
  };

  const drawKeyPointToCanvas = (
    ctx: CanvasRenderingContext2D,
    color: string,
    scale: number,
    alpha: number,
    coordinates: Coordinates,
    lineWidth: number,
    prevCoordinates?: KeyPointData
  ) => {
    ctx.strokeStyle = "white";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 12;
    ctx.globalAlpha = alpha;

    ctx.beginPath();

    ctx.moveTo(coordinates[0] * scale, coordinates[1] * scale);
    ctx.lineTo((coordinates[0] + 0.1) * scale, (coordinates[1] + 0.1) * scale);

    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 8;

    ctx.beginPath();

    ctx.moveTo(coordinates[0] * scale, coordinates[1] * scale);
    ctx.lineTo((coordinates[0] + 0.1) * scale, (coordinates[1] + 0.1) * scale);

    ctx.stroke();
    ctx.closePath();

    if (!prevCoordinates) {
      return;
    }

    ctx.beginPath();

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.moveTo(coordinates[0] * scale, coordinates[1] * scale);
    ctx.lineTo(
      prevCoordinates.coordinates[0] * scale,
      prevCoordinates.coordinates[1] * scale
    );

    ctx.stroke();
  };

  const drawEncodedToCanvas = (
    ctx: CanvasRenderingContext2D,
    color: string,
    originImageSize: ImageSize,
    imageSize: ImageSize,
    data: string,
    alphaScale: number
  ) => {
    const encoded = data;
    const decodedImageData = new ImageData(
      originImageSize.width,
      originImageSize.height
    );

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    DecodeUtil.decodeImageData(
      decodedImageData.data,
      JSON.parse(encoded),
      color,
      alphaScale
    );

    const imageCanvas = LabelingUtil.putImageDataToCanvas(decodedImageData);

    if (!imageCanvas) {
      return;
    }

    ctx.drawImage(
      imageCanvas,
      0,
      0,
      originImageSize.width,
      originImageSize.height,
      0,
      0,
      imageSize.width,
      imageSize.height
    );
  };

  return {
    drawSamToCanvas,
    drawBrushToCanvas,
    drawBoxToCanvas,
    drawPointToCanvas,
    drawKeyPointToCanvas,
    drawEncodedToCanvas,
  };
};

export default useDrawDataToCanvas;
