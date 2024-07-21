import { create } from "zustand";
import {
  useLabelingSlice,
  useLayerSlice,
  useModeSlice,
  useSamSlice,
  useLabelingSettingSlice,
  useViewerSlice,
} from "./slices";
import { BoundStore } from "./slices/boundStoreType";
import { devtools } from "zustand/middleware";

export const useBoundStore = create<BoundStore>()(
  devtools((...a) => ({
    ...useLabelingSlice(...a),
    ...useLabelingSettingSlice(...a),
    ...useLayerSlice(...a),
    ...useModeSlice(...a),
    ...useSamSlice(...a),
    ...useViewerSlice(...a),
  }))
);
