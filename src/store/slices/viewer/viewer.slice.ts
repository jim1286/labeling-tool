import { StateCreator } from 'zustand';
import { BoundStore } from '../boundStoreType';
import { ViewerSlice, ViewerState } from './viewer.types';

const initialState: ViewerState = {
  viewerMergedImage: '',
  hideLabelList: [],
};

export const useViewerSlice: StateCreator<BoundStore, [], [], ViewerSlice> = (set) => ({
  ...initialState,
  setViewerMergedImage: (viewerMergedImage: string) =>
    set({
      viewerMergedImage,
    }),
  setHideLabelList: (hideLabelList: string[]) =>
    set({
      hideLabelList,
    }),
  resetViewerState: () => {
    set(initialState);
  },
});
