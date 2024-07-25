import {
  BrushModeEnum,
  CanvasDataType,
  TaskActionEnum,
  SamModeEnum,
  SamPointTypeEnum,
} from "@/enums";

export type CurrentImage = {
  imageId: number;
  filename: string;
  path: string;
  isLabelConfirmed: boolean;
  data: LabelData | null;
};

export type LabelData = {
  imageHeight: number;
  imageWidth: number;
  mask: string;
  imageClass: string;
  annotations: {
    type: "box" | "seg" | "keypoint";
    bbox: number[];
    label: string;
    data: SegLabelData | BoxLabelData | KeyPointLabelData;
  }[];
};

export type SegLabelData = number;
export type BoxLabelData = Coordinates[];
export type KeyPointLabelData = Coordinates[];

export type CollectionImage = {
  imageId: number;
  filename: string;
  path: string;
  isLabelConfirmed: boolean;
};

export interface ImageSize {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export type Coordinates = [number, number];

export interface TaskLayer {
  id: string;
  defectType: DefectType;
  data: TaskLayerData[];
  hidden: boolean;
}

export interface TaskLayerData {
  type: CanvasDataType;
  data: EncodedData | BrushData | SamData | OdData | KeyPointData;
}

export type EncodedData = string;

export interface BrushData {
  id: string;
  lineWidth: number;
  coordinates: Coordinates[];
  scale: number;
  brushMode: BrushModeEnum;
}

export interface SamData {
  id: string;
  samMode: SamModeEnum;
  data: SamPointData | SamBoxData;
}

export interface SamPointData {
  samPointType: SamPointTypeEnum;
  samPoint: Coordinates;
}

export interface SamBoxData {
  startPoint: Coordinates;
  endPoint: Coordinates;
  width: number;
  height: number;
}

export interface OdData {
  id: string;
  rectangleData: RectangleData;
  version?: number;
  index: number;
  coordinates: Coordinates[];
}

export interface RectangleData extends Point {
  width: number;
  height: number;
}

export interface KeyPointData {
  id: string;
  coordinates: Coordinates;
}

export type EditData = TaskLayerData;

export interface ImageColorFilter {
  contrast: number;
  brightness: number;
  saturate: number;
}

export interface TaskHistoryLayer extends TaskLayer {
  taskAction: TaskActionEnum;
}

export interface ResizeImageInfo {
  width: number;
  height: number;
  scale: number;
}

export interface DefectType {
  name: string;
  color: string;
  defectTypeNumber: number;
}

export interface LayerInfo {
  size: number;
  width: number;
  height: number;
}

export type ViewerTableMode = "none" | "number" | "score";
