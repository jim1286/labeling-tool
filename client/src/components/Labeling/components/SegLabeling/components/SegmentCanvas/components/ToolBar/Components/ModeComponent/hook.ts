import { BrushModeEnum, DrawModeEnum, SamModeEnum } from "@/enums";
import { useSetNewTaskLayer } from "@/hooks";
import { useBoundStore } from "@/store";
// import { useEngineDB } from '@engine-app/engine-db';
import { NotificationInstance } from "antd/es/notification/interface";
import { useEffect, useState } from "react";

export const useMode = (api: NotificationInstance) => {
  const setNewTaskLayer = useSetNewTaskLayer();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setSamMode = useBoundStore((state) => state.setSamMode);
  const setBrushMode = useBoundStore((state) => state.setBrushMode);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const currentImage = useBoundStore((state) => state.currentImage);
  // const { engineDBApi } = useEngineDB();

  useEffect(() => {
    const fetchSam = async () => {
      // const npyPath = await engineDBApi?.getNpy(currentImage.path);
      // setActivateSam(!!npyPath);
    };

    if (currentImage.path) {
      fetchSam();
    }
  }, [currentImage]);

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

  return { handleClickSam, handleClickBrush };
};
