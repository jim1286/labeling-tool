import { styled } from "styled-components";

interface SvgIconContainerProps {
  size?: number;
}

export const SvgIconContainer = styled.div<SvgIconContainerProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
