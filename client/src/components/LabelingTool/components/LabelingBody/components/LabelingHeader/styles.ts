import { styled } from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderButton = styled.div`
  display: flex;
  gap: 8px;
`;
