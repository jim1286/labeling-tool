import { styled } from "styled-components";

interface ClickedProps {
  isClicked?: boolean;
}

export const Container = styled.div<ClickedProps>`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  gap: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${({ isClicked, theme }) =>
    isClicked && theme.bg.fill.primary.active};

  &:hover {
    background: ${({ theme, isClicked }) =>
      isClicked ? undefined : theme.bg.fill.primary.hover};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  width: 128px;

  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const TypoContainer = styled.div`
  width: 168px;
  height: 100%;
  padding: 8px;
  gap: 8px;
  padding-right: 0;
  align-items: center;
  display: flex;
`;
