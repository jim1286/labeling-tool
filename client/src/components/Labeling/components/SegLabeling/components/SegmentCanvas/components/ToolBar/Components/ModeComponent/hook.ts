import { BrushModeEnum, DrawModeEnum, SamModeEnum } from "@/enums";
import { useSetNewTaskLayer } from "@/hooks";
import { useBoundStore } from "@/store";
import { notification } from "antd";

export const useMode = () => {
  const [api, contextHolder] = notification.useNotification();
  const setNewTaskLayer = useSetNewTaskLayer();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setSamMode = useBoundStore((state) => state.setSamMode);
  const setBrushMode = useBoundStore((state) => state.setBrushMode);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);

  const handleClickSam = async () => {
    if (!selectedDefectType) {
      api.open({
        type: "warning",
        message: "레이블을 선택해 주세요.",
        placement: "bottomRight",
      });
      return;
    }

    setDrawMode(DrawModeEnum.SAM);
    setSamMode(SamModeEnum.POINT);
    setNewTaskLayer(taskLayerList, selectedDefectType);
  };

  const handleClickBrush = () => {
    if (!selectedDefectType) {
      api.open({
        type: "warning",
        message: "레이블을 선택해 주세요.",
        placement: "bottomRight",
      });
      return;
    }

    setDrawMode(DrawModeEnum.BRUSH);
    setBrushMode(BrushModeEnum.PAINT);
    setNewTaskLayer(taskLayerList, selectedDefectType);
  };

  return { contextHolder, handleClickSam, handleClickBrush };
};
