import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #141414;
`;

interface CollapsedProps {
  collapsed: boolean;
}

export const Menu = styled.div<CollapsedProps>`
  position: fixed;
  width: ${({ collapsed }) => (collapsed ? "56px" : "295px")};
  height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.border.primary}`};
  background: #141414;
  transition: width 0.4s ease;
  z-index: 999;
`;

export const Body = styled.div`
  width: calc(100% - 56px);
  margin-left: 56px;
  height: 100%;
  display: flex;
`;

export const LabelingWrap = styled.div`
  flex: 1;
`;

export const CollectionWrap = styled.div`
  width: 300px;
  min-width: 200px;
  height: 100%;
`;
