import { styled } from "styled-components";

interface CrossHairProps {
  width?: number;
  height?: number;
}

export const CrossHairY = styled.div<CrossHairProps>`
  position: absolute;
  z-index: 15;
  width: ${({ width }) => width + "px"};
  height: 1px;
  top: -1px;
  background-image: linear-gradient(
    50deg,
    #fff,
    #fff 75%,
    transparent 75%,
    transparent 100%
  );
  background-size: 20px 30px;
  border: none;
`;

export const CrossHairX = styled.div<CrossHairProps>`
  position: absolute;
  z-index: 15;
  width: 1px;
  height: ${({ height }) => height + "px"};
  left: -1px;
  background-image: linear-gradient(
    transparent 30%,
    transparent 50%,
    #fff 50%,
    #fff 100%
  );
  background-size: 23px 20px;
  border: none;
`;
