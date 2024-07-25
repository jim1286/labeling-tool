import { LabelingModeEnum } from "@/enums";
import { CurrentImage, DefectType, ImageColorFilter } from "@/interface";

export type LabelingSettingState = {
  currentImage: CurrentImage;
  collectionImageList: CurrentImage[];
  labelingMode: LabelingModeEnum;
  lineWidth: number;
  brushSize: number;
  defaultDefectType: DefectType | null;
  selectedDefectType: DefectType | null;
  enableReticle: boolean;
  imageColorFilter: ImageColorFilter;
  defectTypeList: DefectType[];
  autoSave: boolean;
};

export type LabelingSettingAction = {
  setCurrentImage: (currentImage: CurrentImage) => void;
  setCollectionImageList: (collectionImageList: CurrentImage[]) => void;
  setLabelingMode: (labelingMode: LabelingModeEnum) => void;
  setLineWidth: (lineWidth: number) => void;
  setBrushSize: (brushSize: number) => void;
  setDefaultDefectType: (defaultDefectType: DefectType | null) => void;
  setSelectedDefectType: (selectedDefectType: DefectType | null) => void;
  setImageColorFilter: (imageColorFilter: ImageColorFilter) => void;
  setEnableReticle: (enableReticle: boolean) => void;
  setDefectTypeList: (defectTypeList: DefectType[]) => void;
  setAutoSave: (autoSave: boolean) => void;
  resetLabelingSettingState: () => void;
};

export type LabelingSettingSlice = LabelingSettingState & LabelingSettingAction;
