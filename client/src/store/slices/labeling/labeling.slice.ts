import { DefectType, ImageSize } from '@/interface';
import { StateCreator } from 'zustand';
import { LabelingState, LabelingSlice } from './labeling.types';
import { BoundStore } from '../boundStoreType';

const initialState: LabelingState = {
  imageSize: {
    width: 0,
    height: 0,
  },
  originImageSize: {
    width: 0,
    height: 0,
  },
  scale: 0,
  initialScale: 0,
  isDrawing: false,
  selectedDefectType: null,
  selectedOriginalDefectType: null,
  disableKeyInLabeling: false,
};

export const useLabelingSlice: StateCreator<BoundStore, [], [], LabelingSlice> = (
  set
) => ({
  ...initialState,
  setImageSize: (imageSize: ImageSize) =>
    set({
      imageSize,
    }),
  setOriginImageSize: (originImageSize: ImageSize) =>
    set({
      originImageSize,
    }),
  setScale: (scale: number) =>
    set({
      scale,
    }),
  setInitialScale: (scale: number) =>
    set({
      scale,
      initialScale: scale,
    }),
  setIsDrawing: (isDrawing: boolean) =>
    set({
      isDrawing,
    }),
  setSelectedDefectType: (selectedDefectType: DefectType | null) =>
    set({
      selectedDefectType,
    }),
  setSelectedOriginalDefectType: (selectedOriginalDefectType: DefectType | null) =>
    set({
      selectedOriginalDefectType,
    }),
  setDisableKeyInLabeling: (disableKeyInLabeling: boolean) =>
    set({
      disableKeyInLabeling,
    }),
  clearSelectedDefectType: () =>
    set({
      selectedDefectType: null,
    }),
  resetLabelingState: () => {
    set(initialState);
  },
});
