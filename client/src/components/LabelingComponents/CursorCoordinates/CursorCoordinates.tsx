import { Spacer } from "@/components";
import React from "react";
import { Container } from "./styles";
import { BM } from "@/theme";
import { Point } from "@/interface";
import { useTheme } from "styled-components";

interface CursorCoordinatesProps {
  point: Point;
  scale: number;
}

const CursorCoordinates: React.FC<CursorCoordinatesProps> = ({
  point,
  scale,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <BM color={theme.text.tertiary}>{`x : ${Math.floor(
        point.x / scale
      )}`}</BM>
      <Spacer size={10} type="vertical" />
      <BM color={theme.text.tertiary}>{`y : ${Math.floor(
        point.y / scale
      )}`}</BM>
    </Container>
  );
};

export default CursorCoordinates;
