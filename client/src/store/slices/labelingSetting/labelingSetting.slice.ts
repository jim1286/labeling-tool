import { CurrentImage, DefectType, ImageColorFilter } from "@/interface";
import { StateCreator } from "zustand";
import {
  LabelingSettingSlice,
  LabelingSettingState,
} from "./labelingSetting.types";
import { BoundStore } from "../boundStoreType";
import { LabelingModeEnum } from "@/enums";
import { customPresetColors, defectTypeColors } from "@/theme/color";
import { SessionStorageUtil } from "@/utils";

const catList = [...Array(10).keys()].map((index) => {
  return {
    imageId: index + 1,
    filename: `cat_${index + 1}.jpg`,
    path: `images/cat_${index + 1}.jpg`,
    isLabelConfirmed: false,
    data: null,
  };
});

const dogList = [...Array(10).keys()].map((index) => {
  return {
    imageId: index + 11,
    filename: `dog_${index + 1}.jpg`,
    path: `images/dog_${index + 1}.jpg`,
    isLabelConfirmed: false,
    data: null,
  };
});

const initialState: LabelingSettingState = {
  labelingMode: LabelingModeEnum.NONE,
  lineWidth: 5,
  brushSize: 50,
  defaultDefectType: null,
  selectedDefectType: null,
  enableReticle: false,
  currentImage: {
    imageId: 1,
    filename: "cat_1.jpg",
    path: "images/cat_1.jpg",
    isLabelConfirmed: false,
    data: null,
  },
  collectionImageList: [...catList, ...dogList],
  defectTypeList: [
    {
      name: "cat",
      color: defectTypeColors[customPresetColors[0]],
      defectTypeNumber: 1,
    },
    {
      name: "dog",
      color: defectTypeColors[customPresetColors[1]],
      defectTypeNumber: 2,
    },
  ],
  autoSave: true,
  imageColorFilter: {
    contrast: 50,
    saturate: 50,
    brightness: 50,
  },
};

export const useLabelingSettingSlice: StateCreator<
  BoundStore,
  [],
  [],
  LabelingSettingSlice
> = (set) => ({
  ...initialState,
  setCurrentImage: (currentImage: CurrentImage) =>
    set({
      currentImage,
    }),
  setCollectionImageList: (collectionImageList: CurrentImage[]) =>
    set({
      collectionImageList,
    }),
  setLabelingMode: (labelingMode: LabelingModeEnum) => {
    SessionStorageUtil.save("taskCategory", labelingMode);
    set({ labelingMode });
  },
  setLineWidth: (lineWidth: number) =>
    set({
      lineWidth,
    }),
  setBrushSize: (brushSize: number) =>
    set({
      brushSize,
    }),
  setAutoSave: (autoSave: boolean) => set({ autoSave }),
  setDefectTypeList: (defectTypeList: DefectType[]) => set({ defectTypeList }),
  setDefaultDefectType: (defaultDefectType: DefectType | null) =>
    set({
      defaultDefectType,
    }),
  setSelectedDefectType: (selectedDefectType: DefectType | null) =>
    set({
      selectedDefectType,
    }),
  setImageColorFilter: (imageColorFilter: ImageColorFilter) =>
    set({
      imageColorFilter,
    }),
  setEnableReticle: (enableReticle: boolean) =>
    set({
      enableReticle,
    }),
  resetLabelingSettingState: () => {
    set(initialState);
  },
});
