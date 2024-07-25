import { styled } from "styled-components";

export const Container = styled.div`
  width: 1px;
  height: 16px;
  margin: 0 12px;
  background-color: ${({ theme }) => theme.border.secondary};
`;
