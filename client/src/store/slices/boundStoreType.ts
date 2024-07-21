import { LabelingSlice } from "./labeling";
import { LayerSlice } from "./layer";
import { ModeSlice } from "./mode";
import { SamSlice } from "./sam";
import { LabelingSettingSlice } from "./labelingSetting";
import { ViewerSlice } from "./viewer";

export type BoundStore = LayerSlice &
  LabelingSlice &
  LabelingSettingSlice &
  ModeSlice &
  SamSlice &
  ViewerSlice;
