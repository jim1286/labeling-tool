import { styled } from "styled-components";

interface CanvasProps {
  isClicked: boolean;
}

export const Container = styled.canvas<CanvasProps>`
  width: 100%;
  height: 100%;
  z-index: ${({ isClicked }) => (isClicked ? 8888 : undefined)};
  position: absolute;
`;
