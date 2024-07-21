import React from "react";
import {
  HeaderButton,
  HeaderButtonContainer,
  HeaderContainer,
  HeaderTitle,
} from "./styles";
import { CustomButton, TooltipWrap } from "@/components";
import { Spin } from "antd";
import { LM } from "@/theme";
import { useBoundStore } from "@/store";
import { LabelingModeEnum } from "@/enums";
import {
  useCurrentImageIsSamLoading,
  useKeyDown,
  useSubmitLabeling,
} from "@/hooks";

const LabelingHeader: React.FC = () => {
  const setAutoSave = useBoundStore((state) => state.setAutoSave);
  const autoSave = useBoundStore((state) => state.autoSave);
  const currentImage = useBoundStore((state) => state.currentImage);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const { isLoading, contextHolder, handleSubmit, fetchCollectionState } =
    useSubmitLabeling();
  const disableSubmit =
    (labelingMode === LabelingModeEnum.CLASSIFICATION && !selectedDefectType) ||
    (labelingMode === LabelingModeEnum.SEGMENTATION &&
      useCurrentImageIsSamLoading());

  const handleSave = async () => {
    await handleSubmit();
    await fetchCollectionState();
  };

  useKeyDown(
    (e) => {
      if (e.metaKey || e.ctrlKey) {
        setAutoSave(!autoSave);
      }
    },
    ["KeyF"]
  );

  useKeyDown(
    async (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (disableSubmit || isLoading) {
          return;
        }
        await handleSave();
      }
    },
    ["KeyS"]
  );

  return (
    <HeaderContainer>
      {contextHolder}
      <HeaderTitle>
        <LM>{currentImage.filename}</LM>
      </HeaderTitle>
      <HeaderButtonContainer>
        <HeaderButton>
          <TooltipWrap title="자동 저장 ON/OFF(Ctrl+F)">
            <CustomButton onClick={() => setAutoSave(!autoSave)} type="primary">
              <LM>자동저장 {autoSave ? "ON" : "OFF"}</LM>
            </CustomButton>
          </TooltipWrap>
          <TooltipWrap
            title={
              disableSubmit
                ? "그리기 모드를 종료(ESC)한 후 저장을 해주세요"
                : "작업저장(Ctrl+S)"
            }
          >
            <CustomButton
              type="default"
              onClick={async () => await handleSave()}
              disabled={disableSubmit}
            >
              <LM>작업저장</LM>
            </CustomButton>
          </TooltipWrap>
        </HeaderButton>
      </HeaderButtonContainer>
      {isLoading && <Spin tip="저장 중..." size="large" fullscreen />}
    </HeaderContainer>
  );
};

export default LabelingHeader;
