import { create } from "zustand";
import {
  useLabelingSlice,
  useLayerSlice,
  useModeSlice,
  useLabelingSettingSlice,
} from "./slices";
import { BoundStore } from "./slices/boundStoreType";
import { devtools } from "zustand/middleware";

export const useBoundStore = create<BoundStore>()(
  devtools((...a) => ({
    ...useLabelingSlice(...a),
    ...useLabelingSettingSlice(...a),
    ...useLayerSlice(...a),
    ...useModeSlice(...a),
  }))
);
