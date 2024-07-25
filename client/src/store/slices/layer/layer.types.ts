import { TaskLayer, EditData, TaskHistoryLayer, LayerInfo } from '@/interface';

export type LayerState = {
  selectedTaskLayerId: string | null;
  originTaskLayerList: TaskLayer[];
  taskLayerList: TaskLayer[];
  editDataList: EditData[];
  editDataHistoryList: EditData[];
  taskUndoLayerList: TaskHistoryLayer[];
  taskRedoLayerList: TaskHistoryLayer[];
  layerInfo: LayerInfo;
};

export type LayerAction = {
  // Common
  setLayerInfo: (layerInfo: LayerInfo) => void;
  setSelectedTaskLayerId: (selectedTaskLayerId: string | null) => void;
  setTaskLayerList: (taskLayerList: TaskLayer[]) => void;
  clearLayerInfo: () => void;
  clearSelectedTaskLayerId: () => void;
  resetLayerState: () => void;

  // Segmentation, Key Point
  setEditDataList: (editDataList: EditData[]) => void;
  setEditDataHistoryList: (editDataHistoryList: EditData[]) => void;
  clearEditDataList: () => void;
  clearEditDataHistoryList: () => void;

  // Object Detection
  setTaskUndoLayerList: (taskUndoLayerList: TaskHistoryLayer[]) => void;
  setTaskRedoLayerList: (taskUndoLayerList: TaskHistoryLayer[]) => void;
};

export type LayerSlice = LayerState & LayerAction;
