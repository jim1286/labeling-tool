import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  padding: 0 8px;
  gap: 8px;
`;

export const ModeContainer = styled.div`
  flex: 1;
`;

export const ToolContainer = styled.div`
  flex: 1;
`;
