import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: ${({ theme }) => `1px solid ${theme.border.primary}`};
`;

export const CollectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  padding: 0 16px;
`;

export const SmartLabeling = styled.div`
  width: 100%;
  height: 48px;
  padding: 15px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
`;

export const CollectionBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 150px;
    background: #2c333a;
  }

  ::-webkit-scrollbar-thumb {
    background: #454f59;
    border-radius: 8px;
    height: 70px;
  }

  ::-webkit-scrollbar-track {
    display: none;
  }
`;

export const CollectionContainer = styled.div`
  flex: 1;
  position: relative;
`;

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
