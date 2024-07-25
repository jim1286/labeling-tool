import { BMS } from "@/theme";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputTitle = styled(BMS)`
  width: 100%;
  height: 20px;
  gap: 3px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.primary};
`;
