import { FlexRow } from "@/components";
import { LabelingModeEnum } from "@/enums";
import React from "react";
import { Container, Title, Explanation } from "./styles";
import { useBoundStore } from "@/store";
import { useNavigate } from "react-router-dom";

interface Props {
  labelingMode: LabelingModeEnum;
  purpose: string;
  work: string;
  example: string;
  result: string;
  style?: React.CSSProperties;
}

const TypeContainer: React.FC<Props> = ({
  labelingMode,
  purpose,
  work,
  example,
  result,
  style,
}) => {
  const navigate = useNavigate();
  const setLabelingMode = useBoundStore((state) => state.setLabelingMode);

  const handleClickMode = (labelingMode: LabelingModeEnum) => {
    setLabelingMode(labelingMode);
    navigate("/labeling");
  };

  return (
    <Container onClick={() => handleClickMode(labelingMode)} style={style}>
      <Title>{labelingMode}</Title>
      <Explanation>
        <FlexRow>목적: {purpose}</FlexRow>
        <FlexRow>작업: {work}</FlexRow>
        <FlexRow>예시: {example}</FlexRow>
        <FlexRow>결과: {result}</FlexRow>
      </Explanation>
    </Container>
  );
};

export default TypeContainer;
