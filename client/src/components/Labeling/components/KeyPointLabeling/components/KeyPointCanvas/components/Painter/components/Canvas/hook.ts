import { CanvasDataType, MouseModeEnum } from "@/enums";
import { useCalculateLayerInfo, useDrawDataToCanvas } from "@/hooks";
import {
  Coordinates,
  EditData,
  KeyPointData,
  TaskLayerData,
} from "@/interface";
import { useBoundStore } from "@/store";
import { notification } from "antd";
import { nanoid } from "nanoid";

export const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  taskLayerData: TaskLayerData[]
) => {
  const setEditDataList = useBoundStore((state) => state.setEditDataList);
  const clearEditDataHistoryList = useBoundStore(
    (state) => state.clearEditDataHistoryList
  );
  const lineWidth = useBoundStore((state) => state.lineWidth);
  const mouseMode = useBoundStore((state) => state.mouseMode);
  const editDataList = useBoundStore((state) => state.editDataList);
  const scale = useBoundStore((state) => state.scale);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const [api, contextHolder] = notification.useNotification();
  const { drawKeyPointToCanvas } = useDrawDataToCanvas();
  const { calculateKeyPointLayerInfo } = useCalculateLayerInfo();
  const currentDataList = [...taskLayerData, ...editDataList];

  const drawHoveringKeyPoint = (hoveringPoint: Coordinates) => {
    if (!canvasRef.current || !selectedDefectType) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      return;
    }

    const prevData = currentDataList[currentDataList.length - 1]
      .data as KeyPointData;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    currentDataList.forEach((currentData, index) => {
      const { data } = currentData;
      const keyPointData = data as KeyPointData;
      const coordinates = keyPointData.coordinates;
      const prevEditData = index === 0 ? undefined : currentDataList[index - 1];

      drawKeyPointToCanvas(
        ctx,
        selectedDefectType.color,
        scale,
        0.7,
        coordinates,
        lineWidth,
        prevEditData?.data as KeyPointData | undefined
      );
    });

    ctx.beginPath();

    ctx.strokeStyle = selectedDefectType.color;
    ctx.lineWidth = lineWidth;

    ctx.moveTo(
      prevData.coordinates[0] * scale,
      prevData.coordinates[1] * scale
    );
    ctx.lineTo(hoveringPoint[0] * scale, hoveringPoint[1] * scale);

    ctx.stroke();

    calculateKeyPointLayerInfo(currentDataList, hoveringPoint);
  };

  const getCurrentPoint = (
    e: React.MouseEvent<HTMLCanvasElement>
  ): Coordinates => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xPosition = e.clientX - rect.left;
    const yPosition = e.clientY - rect.top;

    const lineX = xPosition / scale;
    const lineY = yPosition / scale;

    return [Math.round(lineX), Math.round(lineY)];
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mouseMode === MouseModeEnum.DRAG || currentDataList.length === 0) {
      return;
    }

    drawHoveringKeyPoint(getCurrentPoint(e));
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentDataList.length === 17) {
      api.open({
        type: "warning",
        message: "점은 최대 17개까지 찍을 수 있습니다.",
        placement: "bottomRight",
      });

      return;
    }

    if (!selectedDefectType || mouseMode === MouseModeEnum.DRAG) {
      return;
    }

    const keyPointData: KeyPointData = {
      id: nanoid(),
      coordinates: getCurrentPoint(e),
    };

    const editData: EditData = {
      type: CanvasDataType.KEY_POINT,
      data: keyPointData,
    };

    setEditDataList([...editDataList, editData]);
    clearEditDataHistoryList();
  };

  return {
    scale,
    lineWidth,
    editDataList,
    contextHolder,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
  };
};

export default useCanvas;
