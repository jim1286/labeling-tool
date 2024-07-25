import { LabelingSlice } from "./labeling";
import { LayerSlice } from "./layer";
import { ModeSlice } from "./mode";
import { LabelingSettingSlice } from "./labelingSetting";

export type BoundStore = LayerSlice &
  LabelingSlice &
  LabelingSettingSlice &
  ModeSlice;
