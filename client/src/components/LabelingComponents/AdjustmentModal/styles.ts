import { styled } from "styled-components";

export const AdjustmentModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdjustmentModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 405px;
  height: auto;
  background: ${({ theme }) => theme.bg.surface.tertiary};
  box-sizing: border-box;
  padding: 16px;
  border-radius: 2px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

export const AdjustmentModalHeader = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;

  & > svg {
    width: 16px;
    height: 16px;
  }

  margin-bottom: 8px;
`;

export const AdjustmentModalTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-left: 8px;
  color: ${({ theme }) => theme.text.primary};
`;

export const AdjustmentModalBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const AdjustmentModalFooter = styled.div`
  margin-left: auto;
  margin-top: 2px;
  height: 24px;
`;

export interface CanvasImageProps {
  saturate: number;
  contrast: number;
  brightness: number;
}

export const CanvasImageWrap = styled.div`
  border: ${({ theme }) => `1px solid ${theme.border.primary}`};
`;

export const CanvasImage = styled.img<CanvasImageProps>`
  width: 100%;
  height: 372px;
  box-sizing: border-box;
  object-fit: contain;
  filter: ${({ saturate, contrast, brightness }) =>
    `saturate(${saturate * 2}%) brightness(${brightness * 2}%) contrast(${
      contrast * 2
    }%)`};
`;

export const ResetButton = styled.button`
  width: 52px;
  height: 24px;
  background: white;
  font-family: "Roboto Mono";
  border: 1px solid #1890ff;
  border-radius: 2px;
  font-size: 14px;
  color: #1890ff;
  margin: 12px 0 6px auto;
  cursor: pointer;
`;

export const AdjustmentSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const AdjustmentFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  box-sizing: border-box;
  margin: 6px 0;
`;

export const FilterName = styled.div`
  width: 80px;
  font-family: "Roboto Mono";
  font-style: normal;
  font-size: 12px;
  color: ${({ theme }) => theme.text.primary};
`;

interface FilterRangeProps {
  backSize: number;
}

export const FilterRange = styled.input<FilterRangeProps>`
  width: 175px;
  -webkit-appearance: none;
  margin-right: 15px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(#91d5ff, #91d5ff);
  background-size: ${({ backSize }) => `${backSize}`}% 100%;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    background: #ffffff;
    border: 2px solid #91d5ff;
    border-radius: 20px;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
  }
`;

export const FilterRangeInput = styled.input`
  text-align: center;
  width: 47px;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.text.primary};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1px solid #1890ff;
  }
`;

interface ButtonTypeProps {
  color: string;
}

export const Button = styled.button<ButtonTypeProps>`
  background: ${({ color }) => (color === "default" ? "#ffffff" : "#1890FF")};
  color: ${({ color }) => (color === "default" ? "#000000" : "#ffffff")};
  border: 1px solid
    ${({ color }) => (color === "default" ? "#D9D9D9" : "#1890FF")};
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  height: 24px;
  font-family: "Roboto Mono";
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
  vertical-align: middle;
  padding: 0 10px;

  &:first-of-type {
    margin-right: 8px;
  }
`;
