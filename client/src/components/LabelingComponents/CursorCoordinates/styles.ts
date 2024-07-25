import { styled } from "styled-components";

export const Container = styled.div`
  height: 24px;
  bottom: 0;
  z-index: 9999;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bg.fill.primary.active};
  padding: 0 12px;
`;
