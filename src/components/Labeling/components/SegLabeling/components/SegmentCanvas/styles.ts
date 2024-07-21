import { Point } from "@/interface";
import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export interface CanvasSizeProps {
  width: number;
  height: number;
}

export const ImageContainer = styled.div<CanvasSizeProps>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

export interface CanvasImageProps {
  saturate: number;
  contrast: number;
  brightness: number;
}

export const CanvasImage = styled.img<CanvasImageProps>`
  width: 100%;
  height: 100%;
  z-index: 5;
  position: absolute;
  filter: ${({ saturate, contrast, brightness }) =>
    `saturate(${saturate * 2}%) brightness(${brightness * 2}%) contrast(${
      contrast * 2
    }%)`};

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

export const PainterContainer = styled.div<CanvasSizeProps>`
  z-index: 20;
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

interface BrushProps {
  point: Point;
  size: number;
  rgb: number[];
  brushColor: string;
}

export const BrushCursor = styled.div<BrushProps>`
  left: ${({ point, size }) => `${point.x - size / 2}px`};
  top: ${({ point, size }) => `${point.y - size / 2}px`};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: ${({ rgb }) => `rgb(${rgb[0]},${rgb[1]},${rgb[2]},0.4)`};
  z-index: 9999;
  border: ${({ brushColor }) => `2px solid ${brushColor}`};
  border-radius: 50%;
  pointer-events: none;
`;

export const ToolBarContainer = styled.div`
  width: 100%;
  height: 48px;
`;
