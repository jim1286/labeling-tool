import { CanvasDataType, DrawModeEnum, LabelingModeEnum, TaskActionEnum } from '@/enums';
import { useClearLayerState, useDrawDataToCanvas, useSamToCanvas } from '@/hooks';
import {
  BrushData,
  EditData,
  EncodedData,
  ImageSize,
  TaskHistoryLayer,
  TaskLayer,
  TaskLayerData,
} from '@/interface';
import { useBoundStore } from '@/store';
import { cloneDeep } from 'lodash';
import { useState } from 'react';

const useTaskLayerAction = () => {
  const getPanelCanvas = useDrawPanelCanvas();
  const clearLayerState = useClearLayerState();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);
  const setSelectedTaskLayerId = useBoundStore((state) => state.setSelectedTaskLayerId);
  const setDefaultDefectType = useBoundStore((state) => state.setDefaultDefectType);
  const setSelectedDefectType = useBoundStore((state) => state.setSelectedDefectType);
  const setTaskUndoLayerList = useBoundStore((state) => state.setTaskUndoLayerList);
  const setSelectedOriginalDefectType = useBoundStore(
    (state) => state.setSelectedOriginalDefectType
  );
  const clearSelectedTaskLayerId = useBoundStore(
    (state) => state.clearSelectedTaskLayerId
  );
  const drawMode = useBoundStore((state) => state.drawMode);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const taskUndoLayerList = useBoundStore((state) => state.taskUndoLayerList);
  const editDataList = useBoundStore((state) => state.editDataList);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const [hideAll, setHideAll] = useState(false);
  const [hoveredTask, setHoveredTask] = useState<TaskLayer | null>(null);
  const [taskImage, setTaskImage] = useState<string | null>(null);
  const hoveredTaskId = (() => {
    if (!hoveredTask) {
      return null;
    }

    return hoveredTask.id;
  })();

  const handleMouseEnter = async (taskLayer: TaskLayer) => {
    switch (labelingMode) {
      case LabelingModeEnum.SEGMENTATION: {
        const panelCanvas = await getPanelCanvas(
          drawMode,
          taskLayer,
          originImageSize,
          selectedTaskLayerId === taskLayer.id,
          editDataList
        );

        if (panelCanvas) {
          setTaskImage(panelCanvas.toDataURL());
        }
        break;
      }
    }

    setHoveredTask(taskLayer);
  };

  const handleDeleteTaskLayerImage = () => {
    setTaskImage(null);
  };

  const handleHideClick = () => {
    const newTaskLayerList = cloneDeep(taskLayerList);
    const clickedTaskLayer = newTaskLayerList.find(
      (newTaskLayer) => newTaskLayer.id === hoveredTaskId
    );

    if (!clickedTaskLayer) {
      return;
    }

    clickedTaskLayer.hidden = !clickedTaskLayer.hidden;
    setTaskLayerList(newTaskLayerList);
  };

  const handleHideAllClick = () => {
    setHideAll((prev) => !prev);

    const newTaskLayerList = cloneDeep(taskLayerList);
    newTaskLayerList.forEach((taskLayer) => (taskLayer.hidden = !hideAll));
    setTaskLayerList(newTaskLayerList);
  };

  const handleDeleteClick = () => {
    const newTaskLayerList = [...taskLayerList];
    const clickedTaskLayerIndex = newTaskLayerList.findIndex(
      (newTaskLayer) => newTaskLayer.id === hoveredTaskId
    );

    if (clickedTaskLayerIndex === -1) {
      return;
    }

    switch (labelingMode) {
      case LabelingModeEnum.OBJECT_DETECTION: {
        const newUndoTaskLayer: TaskHistoryLayer = {
          ...newTaskLayerList[clickedTaskLayerIndex],
          taskAction: TaskActionEnum.DELETE,
        };
        setTaskUndoLayerList([...taskUndoLayerList, newUndoTaskLayer]);
        break;
      }
    }

    newTaskLayerList.splice(clickedTaskLayerIndex, 1);
    setTaskLayerList(newTaskLayerList);

    if (selectedTaskLayerId && selectedTaskLayerId === hoveredTaskId) {
      setDrawMode(DrawModeEnum.NONE);
    }
  };

  const handleTaskLayerClick = () => {
    const currentTaskLayer = taskLayerList.find(
      (taskLayer) => taskLayer.id === selectedTaskLayerId
    );

    if (currentTaskLayer?.data.length === 0) {
      return;
    }

    const selectedTaskLayer = taskLayerList.find(
      (taskLayer) => taskLayer.id === hoveredTaskId
    );

    if (!selectedTaskLayer) {
      return;
    }

    switch (labelingMode) {
      case LabelingModeEnum.KEY_POINT: {
        if (selectedTaskLayerId) {
          handleSaveEditData(selectedTaskLayerId);

          if (selectedTaskLayerId === hoveredTaskId) {
            setDrawMode(DrawModeEnum.NONE);
            return;
          }
        }
        setDrawMode(DrawModeEnum.KEY_POINT);
        setSelectedOriginalDefectType(selectedTaskLayer.defectType);
        break;
      }
      case LabelingModeEnum.SEGMENTATION: {
        if (selectedTaskLayerId) {
          handleSaveEditData(selectedTaskLayerId);

          if (selectedTaskLayerId === hoveredTaskId) {
            setDrawMode(DrawModeEnum.NONE);
            return;
          }
        }
        setDrawMode(DrawModeEnum.BRUSH);
        setSelectedOriginalDefectType(selectedTaskLayer.defectType);
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        if (selectedTaskLayerId && selectedTaskLayerId === hoveredTaskId) {
          clearSelectedTaskLayerId();
          return;
        }
        setDrawMode(DrawModeEnum.BOX);
        break;
      }
    }

    setSelectedTaskLayerId(hoveredTaskId);
    setDefaultDefectType(selectedTaskLayer.defectType);
    setSelectedDefectType(selectedTaskLayer.defectType);
  };

  const handleSaveEditData = (selectedTaskLayerId: string) => {
    const newTaskLayerList = cloneDeep(taskLayerList);
    const currentTaskLayer = newTaskLayerList.find(
      (taskLayer) => taskLayer.id === selectedTaskLayerId
    );

    if (!currentTaskLayer) {
      return;
    }

    currentTaskLayer.data.push(...editDataList);
    setTaskLayerList(newTaskLayerList);
    clearLayerState();
  };

  const handleDeleteAllClick = () => {
    setTaskLayerList([]);
    setDrawMode(DrawModeEnum.NONE);

    if (labelingMode === LabelingModeEnum.OBJECT_DETECTION) {
      const newUndoTaskLayerList: TaskHistoryLayer[] = [];

      taskLayerList.forEach((taskLayer) => {
        const newUndoTaskLayer: TaskHistoryLayer = {
          ...taskLayer,
          taskAction: TaskActionEnum.DELETE,
        };

        newUndoTaskLayerList.push(newUndoTaskLayer);
      });

      setTaskUndoLayerList([...taskUndoLayerList, ...newUndoTaskLayerList]);
    }
  };

  return {
    hideAll,
    editDataList,
    taskLayerList,
    taskImage,
    hoveredTaskId,
    selectedTaskLayerId,
    handleTaskLayerClick,
    handleMouseEnter,
    handleHideClick,
    handleHideAllClick,
    handleDeleteAllClick,
    handleDeleteClick,
    handleDeleteTaskLayerImage,
  };
};

const useDrawPanelCanvas = () => {
  const { drawEncodedToCanvas, drawBrushToCanvas } = useDrawDataToCanvas();
  const samToCanvas = useSamToCanvas();

  const getPanelCanvas = async (
    drawMode: DrawModeEnum,
    taskLayer: TaskLayer,
    originImageSize: ImageSize,
    isEditing: boolean,
    editDataList: EditData[]
  ) => {
    const canvas = document.createElement('canvas');

    canvas.width = originImageSize.width;
    canvas.height = originImageSize.height;

    const ctx = canvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!ctx) {
      return;
    }

    const taskLayerDataList = taskLayer.data.flat() as TaskLayerData[];

    if (isEditing) {
      taskLayerDataList.push(...(editDataList as TaskLayerData[]));
    }

    if (drawMode === DrawModeEnum.SAM && isEditing) {
      if (editDataList.length === 0) {
        return;
      }

      await samToCanvas(
        'click',
        ctx,
        taskLayer.defectType.color,
        originImageSize,
        originImageSize,
        taskLayerDataList
      );

      return canvas;
    }

    taskLayerDataList.forEach((taskLayerData) => {
      const { type, data } = taskLayerData;

      switch (type) {
        case CanvasDataType.ENCODED: {
          drawEncodedToCanvas(
            ctx,
            taskLayer.defectType.color,
            originImageSize,
            originImageSize,
            data as EncodedData,
            0.5
          );
          break;
        }
        case CanvasDataType.BRUSH: {
          const taskLayerData = data as BrushData;
          const brushSize = taskLayerData.lineWidth / taskLayerData.scale;
          const brushMode = taskLayerData.brushMode;
          const coordinates = taskLayerData.coordinates;

          drawBrushToCanvas(
            ctx,
            taskLayer.defectType.color,
            1,
            brushSize,
            brushMode,
            coordinates,
            0.5
          );
          break;
        }
      }
    });

    return canvas;
  };

  return getPanelCanvas;
};

export default useTaskLayerAction;
