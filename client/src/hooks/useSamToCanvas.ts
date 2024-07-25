import {
  Coordinates,
  EditData,
  ImageSize,
  SamBoxData,
  SamData,
  SamPointData,
} from "@/interface";
import { SamModeEnum, SamPointTypeEnum } from "@/enums";
import { useDrawDataToCanvas } from ".";
import { useBoundStore } from "@/store";

const useSamToCanvas = () => {
  const initialScale = useBoundStore((state) => state.initialScale);
  const { drawSamToCanvas } = useDrawDataToCanvas();

  const samToCanvas = async (
    mode: "original" | "click" | "hover",
    ctx: CanvasRenderingContext2D,
    color: string,
    imageSize: ImageSize,
    canvasSize: ImageSize,
    editDataList: EditData[]
  ) => {
    const pointDataList = editDataList.filter(
      (
        editData
      ): editData is EditData & { data: SamData & { data: SamPointData } } =>
        (editData.data as SamData).samMode === SamModeEnum.POINT
    );
    const samPointList = pointDataList.map(
      (editData) => editData.data.data.samPoint
    );
    const samPointTypeList = pointDataList.map(
      (editData) => editData.data.data.samPointType
    );

    const findBox = editDataList.find(
      (
        editData
      ): editData is EditData & { data: SamData & { data: SamBoxData } } =>
        (editData.data as SamData).samMode === SamModeEnum.BOX
    );
    const samBoxData = findBox ? findBox.data.data : undefined;
    const samBoxPoints = samBoxData
      ? [[...samBoxData.startPoint], [...samBoxData.endPoint]]
      : [];

    switch (mode) {
      case "original": {
        await drawSamToCanvas(
          ctx,
          color,
          imageSize,
          canvasSize,
          samPointList,
          samPointTypeList,
          samBoxPoints
        );
        break;
      }
      case "click": {
        let resizeValue;

        if (initialScale > 2) {
          resizeValue = 0.8;
        } else if (initialScale > 1) {
          resizeValue = 0.7;
        } else if (initialScale > 0.8) {
          resizeValue = 0.6;
        } else if (initialScale > 0.6) {
          resizeValue = 0.5;
        } else {
          resizeValue = 0.4;
        }

        await drawSamToCanvasWithResize(
          ctx,
          color,
          imageSize,
          canvasSize,
          resizeValue,
          samPointList,
          samPointTypeList,
          samBoxPoints
        );

        break;
      }
      case "hover": {
        let resizeValue;

        if (initialScale > 2) {
          resizeValue = 0.8;
        } else if (initialScale > 1) {
          resizeValue = 0.7;
        } else if (initialScale > 0.8) {
          resizeValue = 0.6;
        } else if (initialScale > 0.6) {
          resizeValue = 0.3;
        } else {
          resizeValue = 0.2;
        }

        await drawSamToCanvasWithResize(
          ctx,
          color,
          imageSize,
          canvasSize,
          resizeValue,
          samPointList,
          samPointTypeList,
          samBoxPoints
        );

        break;
      }
    }
  };

  const resize = (
    resizeValue: number,
    samPointList: Coordinates[],
    samBoxPoints: number[][],
    imageSize: ImageSize
  ) => {
    const resizedSamPointList = samPointList.map((samPoint) =>
      samPoint.map((ele) => ele * resizeValue)
    );
    const resizedSamBoxPoints = samBoxPoints.map((samBox) =>
      samBox.map((box) => box * resizeValue)
    );
    const resizedImageSize = {
      width: Math.round(imageSize.width * resizeValue),
      height: Math.round(imageSize.height * resizeValue),
    };

    return { resizedSamPointList, resizedSamBoxPoints, resizedImageSize };
  };

  const drawSamToCanvasWithResize = async (
    ctx: CanvasRenderingContext2D,
    color: string,
    imageSize: ImageSize,
    canvasSize: ImageSize,
    resizeValue: number,
    samPointList: Coordinates[],
    samPointTypeList: SamPointTypeEnum[],
    samBoxPoints: number[][]
  ) => {
    const { resizedSamPointList, resizedSamBoxPoints, resizedImageSize } =
      resize(resizeValue, samPointList, samBoxPoints, imageSize);

    await drawSamToCanvas(
      ctx,
      color,
      resizedImageSize,
      canvasSize,
      resizedSamPointList,
      samPointTypeList,
      resizedSamBoxPoints
    );
  };

  return samToCanvas;
};

export default useSamToCanvas;
