import React from "react";
import { BodyContainer, Container, InfoContainer, InfoTitle } from "./styles";
import { BS, LM } from "@/theme";
import { FlexRow } from "@/components/BaseStyle";
import { useBoundStore } from "@/store";

const TaskLayerInfo: React.FC = () => {
  const layerInfo = useBoundStore((state) => state.layerInfo);

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>
          <LM>{`레이어 정보`}</LM>
        </InfoTitle>
      </InfoContainer>
      <BodyContainer>
        <FlexRow gap={20} alignItems="center">
          <BS>면적</BS>
          <BS>{layerInfo.size} px</BS>
        </FlexRow>
        <FlexRow gap={20} alignItems="center">
          <BS>너비</BS>
          <BS>{layerInfo.width}</BS>
        </FlexRow>
        <FlexRow gap={20} alignItems="center">
          <BS>높이</BS>
          <BS>{layerInfo.height}</BS>
        </FlexRow>
      </BodyContainer>
    </Container>
  );
};

export default TaskLayerInfo;
