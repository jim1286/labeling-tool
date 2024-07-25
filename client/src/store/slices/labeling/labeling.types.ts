import { DefectType, ImageSize } from '@/interface';

export type LabelingState = {
  imageSize: ImageSize;
  originImageSize: ImageSize;
  scale: number;
  initialScale: number;
  isDrawing: boolean;
  disableKeyInLabeling: boolean;
  selectedDefectType: DefectType | null;
  selectedOriginalDefectType: DefectType | null;
};

export type LabelingAction = {
  setImageSize: (imageSize: ImageSize) => void;
  setOriginImageSize: (originImageSize: ImageSize) => void;
  setScale: (scale: number) => void;
  setInitialScale: (scale: number) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setDisableKeyInLabeling: (disableKeyInLabeling: boolean) => void;
  setSelectedDefectType: (selectedDefectType: DefectType | null) => void;
  setSelectedOriginalDefectType: (selectedOriginalDefectType: DefectType | null) => void;
  clearSelectedDefectType: () => void;
  resetLabelingState: () => void;
};

export type LabelingSlice = LabelingState & LabelingAction;
