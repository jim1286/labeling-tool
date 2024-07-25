import { styled } from "styled-components";

interface WidthProps {
  width: number;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BrushSizeContainer = styled.div`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.border.primary}`};
  border-radius: 4px;
`;

export const SizeWrap = styled.div<WidthProps>`
  display: flex;
  width: ${({ width }) => `${width}px`};
  justify-content: center;
  align-items: center;
  border-right: ${({ theme }) => `1px solid ${theme.border.primary}`};
  border-left: ${({ theme }) => `1px solid ${theme.border.primary}`};

  .ant-input-number-input {
    color: ${({ theme }) => theme.text.primary} !important;
  }
`;
