import { BMS } from "@/theme";
import { styled } from "styled-components";

export const Container = styled(BMS)`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.text.danger};
`;
