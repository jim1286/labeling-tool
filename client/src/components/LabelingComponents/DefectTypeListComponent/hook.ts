import { DrawModeEnum, LabelingModeEnum } from "@/enums";
import { useKeyDown, useSetNewTaskLayer } from "@/hooks";
import { DefectType } from "@/interface";
import { useBoundStore } from "@/store";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import { cloneDeep } from "lodash";
import { customPresetColors, defectTypeColors } from "@/theme/color";

export const useDefectType = (api: NotificationInstance) => {
  const setNewTaskLayer = useSetNewTaskLayer();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);
  const setDefaultDefectType = useBoundStore(
    (state) => state.setDefaultDefectType
  );
  const setSelectedDefectType = useBoundStore(
    (state) => state.setSelectedDefectType
  );
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const selectedTaskLayerId = useBoundStore(
    (state) => state.selectedTaskLayerId
  );

  const handleClick = (defectType: DefectType) => {
    handleDefectType(defectType);
  };

  const handleDefectType = (defectType: DefectType) => {
    switch (labelingMode) {
      case LabelingModeEnum.CLASSIFICATION: {
        if (defectTypeList.length === 1) {
          api.open({
            type: "warning",
            message: "최소 2개 이상의 레이블을 등록해 주세요.",
            placement: "bottomRight",
          });
          return;
        }

        setSelectedDefectType(defectType);
        setDefaultDefectType(defectType);
        break;
      }
      case LabelingModeEnum.KEY_POINT: {
        if (selectedTaskLayerId) {
          changeTaskLayerDefectType(defectType);
        } else {
          setNewTaskLayer(taskLayerList, defectType);
          setDrawMode(DrawModeEnum.KEY_POINT);
        }
        break;
      }
      case LabelingModeEnum.SEGMENTATION: {
        if (selectedTaskLayerId) {
          changeTaskLayerDefectType(defectType);
        } else {
          setDefaultDefectType(defectType);
          setSelectedDefectType(defectType);
        }
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        if (selectedDefectType?.name === defectType.name) {
          return;
        }

        if (selectedTaskLayerId) {
          changeTaskLayerDefectType(defectType);
        }

        setDrawMode(DrawModeEnum.BOX);
        setSelectedDefectType(defectType);
        setDefaultDefectType(defectType);
        break;
      }
    }
  };

  const changeTaskLayerDefectType = (defectType: DefectType) => {
    const newTaskLayerList = cloneDeep(taskLayerList);
    const newTaskLayer = newTaskLayerList.find(
      (taskLayer) => taskLayer.id === selectedTaskLayerId
    );

    if (!newTaskLayer) {
      return;
    }

    newTaskLayer.defectType = defectType;
    setTaskLayerList(newTaskLayerList);
    setDefaultDefectType(defectType);
    setSelectedDefectType(defectType);
  };

  useKeyDown(
    (e) => {
      const number = Number(e.key);
      handleDefectType(defectTypeList[number - 1]);
    },
    defectTypeList.map((defectType) => "Digit" + defectType.defectTypeNumber)
  );

  return {
    defectTypeList,
    handleClick,
  };
};

export const useDefectAddModal = (api: NotificationInstance) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  const setDefectTypeList = useBoundStore((state) => state.setDefectTypeList);
  const setDisableKeyInLabeling = useBoundStore(
    (state) => state.setDisableKeyInLabeling
  );

  const handleAddModalClose = (message?: string) => {
    setDisableKeyInLabeling(false);
    setIsAddModalOpen(false);

    if (message) {
      api.open({
        type: "success",
        message: message,
        placement: "bottomRight",
      });
    }
  };

  const handleAddModalOpen = () => {
    setDisableKeyInLabeling(true);
    setIsAddModalOpen(true);
  };

  const handleAddModalOk = async (inputValue: string) => {
    setDefectTypeList([
      ...defectTypeList,
      {
        name: inputValue,
        color: defectTypeColors[customPresetColors[defectTypeList.length - 1]],
        defectTypeNumber: defectTypeList.length,
      },
    ]);
  };

  return {
    isAddModalOpen,
    handleAddModalClose,
    handleAddModalOpen,
    handleAddModalOk,
  };
};

export const useDefectEditModal = (api: NotificationInstance) => {
  const setDisableKeyInLabeling = useBoundStore(
    (state) => state.setDisableKeyInLabeling
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalClose = (message?: string) => {
    setDisableKeyInLabeling(false);
    setIsEditModalOpen(false);

    if (message) {
      api.open({
        type: "success",
        message: message,
        placement: "bottomRight",
      });
    }
  };

  const handleEditModalOpen = () => {
    setDisableKeyInLabeling(true);
    setIsEditModalOpen(true);
  };

  return {
    isEditModalOpen,
    handleEditModalClose,
    handleEditModalOpen,
  };
};
