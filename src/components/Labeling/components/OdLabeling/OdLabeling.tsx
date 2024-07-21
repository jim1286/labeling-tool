import React, { useEffect } from "react";
import { OdCanvas } from "./components";
import { useClearLayerState, useInitLabeling } from "@/hooks";
import { CanvasWrapper, Container, PanelWrapper } from "./styles";
import { useBoundStore } from "@/store";
import { DrawModeEnum } from "@/enums";
import { Spin } from "antd";
import { LabelingPanel } from "@/components";

const OdLabeling: React.FC = () => {
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
        <OdCanvas />
      </CanvasWrapper>
      {isLoading && <Spin tip="로딩 중..." size="large" fullscreen />}
    </Container>
  );
};

export default OdLabeling;
