import React from "react";
import { Container } from "./styles";
import { BS, LM } from "@/theme";
import { FlexColumn } from "@/components";
import { useBoundStore } from "@/store";
import { LabelingModeEnum } from "@/enums";
import { useTheme } from "styled-components";

const EmptyLayer: React.FC = () => {
  const theme = useTheme();
  const labelingMode = useBoundStore((state) => state.labelingMode);

  return (
    <Container>
      <FlexColumn alignItems="center" gap={10}>
        <LM color={theme.text.brand}>레이어 없음</LM>
        <FlexColumn alignItems="center">
          <BS color={theme.text.secondary}>레이블 선택 후</BS>
          {labelingMode === LabelingModeEnum.SEGMENTATION && (
            <BS color={theme.text.secondary}>
              스마트 라벨링 혹은 브러시를 선택하여
            </BS>
          )}
          <BS color={theme.text.secondary}>레이블링 하세요.</BS>
        </FlexColumn>
      </FlexColumn>
    </Container>
  );
};

export default EmptyLayer;
