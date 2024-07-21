import { EditData, LayerInfo, TaskHistoryLayer, TaskLayer } from '@/interface';
import { StateCreator } from 'zustand';
import { LayerState, LayerSlice } from './layer.types';
import { BoundStore } from '../boundStoreType';

const initialState: LayerState = {
  selectedTaskLayerId: null,
  originTaskLayerList: [],
  taskLayerList: [],
  editDataList: [],
  editDataHistoryList: [],
  taskUndoLayerList: [],
  taskRedoLayerList: [],
  layerInfo: { size: 0, width: 0, height: 0 },
};

export const useLayerSlice: StateCreator<BoundStore, [], [], LayerSlice> = (set) => ({
  ...initialState,
  setSelectedTaskLayerId: (selectedTaskLayerId: string | null) =>
    set({
      selectedTaskLayerId,
    }),
  setTaskLayerList: (taskLayerList: TaskLayer[]) =>
    set({
      taskLayerList,
    }),
  setEditDataList: (editDataList: EditData[]) =>
    set({
      editDataList,
    }),
  setEditDataHistoryList: (editDataHistoryList: EditData[]) =>
    set({
      editDataHistoryList,
    }),
  setTaskUndoLayerList: (taskUndoLayerList: TaskHistoryLayer[]) =>
    set({
      taskUndoLayerList,
    }),
  setTaskRedoLayerList: (taskRedoLayerList: TaskHistoryLayer[]) =>
    set({
      taskRedoLayerList,
    }),
  setLayerInfo: (layerInfo: LayerInfo) =>
    set({
      layerInfo,
    }),
  clearSelectedTaskLayerId: () =>
    set({
      selectedTaskLayerId: null,
    }),
  clearEditDataList: () =>
    set({
      editDataList: [],
    }),
  clearEditDataHistoryList: () =>
    set({
      editDataHistoryList: [],
    }),
  clearLayerInfo: () =>
    set({
      layerInfo: initialState.layerInfo,
    }),
  resetLayerState: () => {
    set(initialState);
  },
});
