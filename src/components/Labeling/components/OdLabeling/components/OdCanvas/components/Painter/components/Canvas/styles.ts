import { styled } from "styled-components";

interface CanvasProps {
  isClicked: boolean;
}

export const Container = styled.canvas<CanvasProps>`
  z-index: ${({ isClicked }) => (isClicked ? 9999 : undefined)};
  position: absolute;
`;

export const ObjectDetectionContainer = styled.div`
  z-index: 5555;
  position: absolute;
`;
