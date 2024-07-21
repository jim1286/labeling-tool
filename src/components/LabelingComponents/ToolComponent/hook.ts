import { LabelingModeEnum, TaskActionEnum } from '@/enums';
import { useKeyDown } from '@/hooks';
import {
  EditData,
  ImageColorFilter,
  OdData,
  TaskHistoryLayer,
  TaskLayer,
} from '@/interface';
import { useBoundStore } from '@/store';
import { cloneDeep } from 'lodash';
import { useState } from 'react';

const useToolAction = () => {
  const setScale = useBoundStore((state) => state.setScale);
  const setImageSize = useBoundStore((state) => state.setImageSize);
  const setImageColorFilter = useBoundStore((state) => state.setImageColorFilter);
  const setEnableReticle = useBoundStore((state) => state.setEnableReticle);
  const setEditDataList = useBoundStore((state) => state.setEditDataList);
  const setEditDataHistoryList = useBoundStore((state) => state.setEditDataHistoryList);
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);
  const setTaskUndoLayerList = useBoundStore((state) => state.setTaskUndoLayerList);
  const setTaskRedoLayerList = useBoundStore((state) => state.setTaskRedoLayerList);
  const setLineWidth = useBoundStore((state) => state.setLineWidth);
  const setDisableKeyInLabeling = useBoundStore((state) => state.setDisableKeyInLabeling);
  const lineWidth = useBoundStore((state) => state.lineWidth);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const taskUndoLayerList = useBoundStore((state) => state.taskUndoLayerList);
  const taskRedoLayerList = useBoundStore((state) => state.taskRedoLayerList);
  const editDataList = useBoundStore((state) => state.editDataList);
  const editDataHistoryList = useBoundStore((state) => state.editDataHistoryList);
  const initialScale = useBoundStore((state) => state.initialScale);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const scale = useBoundStore((state) => state.scale);
  const enableReticle = useBoundStore((state) => state.enableReticle);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const [openAdjustmentModal, setSetOpenAdjustmentModal] = useState(false);

  const handleLineWidthDecrease = () => {
    if (lineWidth > 1) {
      setLineWidth(lineWidth - 1);
    }
  };

  const handleLineWidthIncrease = () => {
    if (lineWidth < 20) {
      setLineWidth(lineWidth + 1);
    }
  };

  const createTaskLayer = (redoLayer: TaskHistoryLayer) => {
    const newTaskLayer: any = { ...redoLayer };
    delete newTaskLayer.action;
    const newTaskLayerList: TaskLayer[] = [...taskLayerList, newTaskLayer].sort(
      (a: TaskLayer, b: TaskLayer) =>
        (a.data[0].data as OdData).index - (b.data[0].data as OdData).index
    );

    setTaskLayerList(newTaskLayerList);
  };

  const deleteTaskLayer = (taskLayer: TaskHistoryLayer) => {
    const newTaskLayerList = [...taskLayerList];
    const taskLayerIndex = taskLayerList.findIndex(
      (newTaskLayer) => newTaskLayer.id === taskLayer.id
    );

    if (taskLayerIndex === -1) {
      return;
    }

    newTaskLayerList.splice(taskLayerIndex, 1);
    setTaskLayerList(newTaskLayerList);
  };

  const handleReticle = () => {
    setEnableReticle(!enableReticle);
  };

  const handleOriginSize = () => {
    const newImageSize = {
      width: originImageSize.width * initialScale,
      height: originImageSize.height * initialScale,
    };

    setScale(initialScale);
    setImageSize(newImageSize);
  };

  const handleChangeSize = (newScale: number) => {
    const newImageSize = {
      width: originImageSize.width * newScale,
      height: originImageSize.height * newScale,
    };

    setScale(newScale);
    setImageSize(newImageSize);
  };

  const handleImageIncrease = (add: number) => {
    const newScale = scale + add;

    if (newScale < initialScale) {
      handleOriginSize();
      return;
    }

    handleChangeSize(newScale);
  };

  const handleImageDecrease = (minus: number) => {
    const newScale = scale + minus;

    if (newScale < initialScale) {
      handleOriginSize();
      return;
    }

    if (newScale > initialScale * 5) {
      return;
    }

    handleChangeSize(newScale);
  };

  const handleImageColorFilterSubmit = (filter?: ImageColorFilter) => {
    setDisableKeyInLabeling(false);
    setSetOpenAdjustmentModal(false);

    if (filter) {
      setImageColorFilter(filter);
    }
  };

  const handleOpenAdjustmentModal = () => {
    setDisableKeyInLabeling(true);
    setSetOpenAdjustmentModal(true);
  };

  const handleUndo = () => {
    switch (labelingMode) {
      case LabelingModeEnum.SEGMENTATION:
      case LabelingModeEnum.KEY_POINT: {
        if (editDataList.length === 0) {
          return;
        }

        const newEditDataList = [...editDataList];
        const editData = newEditDataList.pop() as EditData;

        setEditDataHistoryList([...editDataHistoryList, editData]);
        setEditDataList(newEditDataList);
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        if (taskUndoLayerList.length === 0) {
          return;
        }

        const newUndoLayerList = cloneDeep(taskUndoLayerList);
        const undoLayer = newUndoLayerList.pop();

        if (!undoLayer) {
          return;
        }

        setTaskRedoLayerList([...taskRedoLayerList, undoLayer]);
        setTaskUndoLayerList(newUndoLayerList);

        switch (undoLayer.taskAction) {
          case TaskActionEnum.CREATE: {
            deleteTaskLayer(undoLayer);
            break;
          }
          case TaskActionEnum.DELETE: {
            createTaskLayer(undoLayer);
            break;
          }
        }
      }
    }
  };

  const handleRedo = () => {
    switch (labelingMode) {
      case LabelingModeEnum.SEGMENTATION:
      case LabelingModeEnum.KEY_POINT: {
        if (editDataHistoryList.length === 0) {
          return;
        }

        const newEditDataHistoryList = [...editDataHistoryList];
        const editDataHistory = newEditDataHistoryList.pop() as EditData;

        setEditDataList([...editDataList, editDataHistory]);
        setEditDataHistoryList(newEditDataHistoryList);
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        if (taskRedoLayerList.length === 0) {
          return;
        }

        const newRedoLayerList = [...taskRedoLayerList];
        const redoLayer = newRedoLayerList.pop();

        if (!redoLayer) {
          return;
        }

        setTaskUndoLayerList([...taskUndoLayerList, redoLayer]);
        setTaskRedoLayerList(newRedoLayerList);

        switch (redoLayer.taskAction) {
          case TaskActionEnum.CREATE: {
            createTaskLayer(redoLayer);
            break;
          }
          case TaskActionEnum.DELETE: {
            deleteTaskLayer(redoLayer);
            break;
          }
        }
      }
    }
  };

  useKeyDown(() => {
    if (labelingMode === LabelingModeEnum.KEY_POINT) {
      handleLineWidthDecrease();
    }
  }, ['BracketLeft']);

  useKeyDown(() => {
    if (labelingMode === LabelingModeEnum.KEY_POINT) {
      handleLineWidthIncrease();
    }
  }, ['BracketRight']);

  useKeyDown(() => {
    handleReticle();
  }, ['KeyT']);

  useKeyDown(
    (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
        handleUndo();
      }
    },
    ['KeyZ']
  );

  useKeyDown(
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
        handleRedo();
      }
    },
    ['KeyZ']
  );

  return {
    scale,
    lineWidth,
    enableReticle,
    openAdjustmentModal,
    handleUndo,
    handleRedo,
    setLineWidth,
    handleLineWidthDecrease,
    handleLineWidthIncrease,
    handleOriginSize,
    handleImageIncrease,
    handleImageDecrease,
    handleImageColorFilterSubmit,
    handleOpenAdjustmentModal,
    handleReticle,
  };
};

export default useToolAction;
