import React, { useEffect } from "react";
import { LabelingModeEnum } from "@/enums";
import {
  ClsLabeling,
  KeyPointLabeling,
  OdLabeling,
  SegLabeling,
} from "./components";
import { useBoundStore } from "@/store";
import { Spin } from "antd";
import useCreateNpy from "./hook";
import { BM } from "@/theme";
import { FlexColumn } from "../BaseStyle";
import { useCurrentImageIsSamLoading, useSam } from "@/hooks";
import { useGetOnnxBufferQuery } from "@/queries";

const Labeling: React.FC = () => {
  const ableNpyRequest = useBoundStore((state) => state.ableNpyRequest);
  const npyRequests = useBoundStore((state) => state.npyRequests);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const { isLoading: onnxBufferIsLoading, data: onnxBufferData } =
    useGetOnnxBufferQuery(labelingMode);
  const { contextHolder, createNpy } = useCreateNpy();
  const { initOnnx, initNpy } = useSam();

  useEffect(() => {
    if (labelingMode === LabelingModeEnum.SEGMENTATION && onnxBufferData) {
      initOnnx(onnxBufferData);
    }
  }, [onnxBufferData, labelingMode]);

  useEffect(() => {
    if (labelingMode === LabelingModeEnum.SEGMENTATION && ableNpyRequest) {
      createNpy(npyRequests);
    }
  }, [npyRequests, ableNpyRequest]);

  return (() => {
    switch (labelingMode) {
      case LabelingModeEnum.CLASSIFICATION:
        return <ClsLabeling />;
      case LabelingModeEnum.OBJECT_DETECTION:
        return <OdLabeling />;
      case LabelingModeEnum.SEGMENTATION: {
        return useCurrentImageIsSamLoading() ? (
          <>
            <Spin
              tip={
                <FlexColumn alignItems="center">
                  <BM>스마트 라벨링 생성중...</BM>
                  <BM>A,D로 이미지 이동을 할 수 있으며</BM>
                  <BM>Ctrl+Tab으로 스마트 라벨링 생성을 중단할 수 있습니다.</BM>
                </FlexColumn>
              }
              size="large"
              fullscreen
            />
            {contextHolder}
          </>
        ) : (
          <SegLabeling />
        );
      }
      case LabelingModeEnum.KEY_POINT:
        return <KeyPointLabeling />;
      default:
        return null;
    }
  })();
};

export default Labeling;
