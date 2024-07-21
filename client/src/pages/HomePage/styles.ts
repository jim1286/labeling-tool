import { BM, H3 } from "@/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #141414;
  gap: 50px;
`;

export const LabelingMode = styled.div`
  width: 50vw;
  height: 50vh;
  border: ${({ theme }) => `5px solid ${theme.border.primary}`};
  border-radius: 10px;
`;

export const ModeText = styled(H3)`
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
  height: 100px;
  justify-content: center;
  align-items: center;
`;

export const Explanation = styled(BM)`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 0 40px;
`;
