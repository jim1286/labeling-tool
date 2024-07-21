import { BM, H3 } from "@/theme";
import styled from "styled-components";

export const Container = styled(H3)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.text.primary};
  gap: 30px;
  cursor: pointer;
`;

export const Title = styled(H3)`
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => `2px solid ${theme.border.primary}`};
`;

export const Explanation = styled(BM)`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 0 40px;
`;
