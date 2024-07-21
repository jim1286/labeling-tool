import React, { useEffect } from "react";
import { KeyPointCanvas } from "./components";
import { DrawModeEnum } from "@/enums";
import { useClearLayerState, useInitLabeling } from "@/hooks";
import { CanvasWrapper, Container, PanelWrapper } from "./styles";
import { useBoundStore } from "@/store";
import { Spin } from "antd";
import { LabelingPanel } from "@/components";

const KeyPointLabeling: React.FC = () => {
  const drawMode = useBoundStore((state) => state.drawMode);
  const clearLayerState = useClearLayerState();
  const { isLoading } = useInitLabeling();

  useEffect(() => {
    if (drawMode === DrawModeEnum.NONE) {
      clearLayerState();
    }
  }, [drawMode]);

  return (
    <Container>
      <PanelWrapper>
        <LabelingPanel />
      </PanelWrapper>
      <CanvasWrapper>
        <KeyPointCanvas />
      </CanvasWrapper>
      {isLoading && <Spin tip="로딩 중..." size="large" fullscreen />}
    </Container>
  );
};

export default KeyPointLabeling;
