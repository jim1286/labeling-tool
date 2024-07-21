import { styled } from "styled-components";

interface CollectionItemProps {
  isSelected: boolean;
}

export const CollectionItem = styled.div<CollectionItemProps>`
  width: 100%;
  height: 48px;
  padding: 15px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ isSelected, theme }) =>
    isSelected && theme.bg.fill.primary.active};
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  cursor: pointer;
`;
