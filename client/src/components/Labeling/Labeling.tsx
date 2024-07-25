import React from "react";
import { LabelingModeEnum } from "@/enums";
import {
  ClsLabeling,
  KeyPointLabeling,
  OdLabeling,
  SegLabeling,
} from "./components";
import { useBoundStore } from "@/store";

const Labeling: React.FC = () => {
  const labelingMode = useBoundStore((state) => state.labelingMode);

  return (() => {
    switch (labelingMode) {
      case LabelingModeEnum.CLASSIFICATION:
        return <ClsLabeling />;
      case LabelingModeEnum.OBJECT_DETECTION:
        return <OdLabeling />;
      case LabelingModeEnum.SEGMENTATION:
        return <SegLabeling />;
      case LabelingModeEnum.KEY_POINT:
        return <KeyPointLabeling />;
      default:
        return null;
    }
  })();
};

export default Labeling;
