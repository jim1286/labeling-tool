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
  ableNpyRequest: true,
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
  setAbleNpyRequest: (ableNpyRequest: boolean) =>
    set({
      ableNpyRequest,
    }),
  resetLabelingSettingState: () => {
    set(initialState);
  },
});
