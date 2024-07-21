import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: ${({ theme }) => `1px solid ${theme.border.primary}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
`;

export const InfoTitle = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  padding: 16px;
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 48px;
`;

export const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-left: 16px;
  padding-right: 16px;
  gap: 15px;
`;
