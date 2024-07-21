import { styled } from "styled-components";
import { IconEdit, IconPlus } from "@tabler/icons-react";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.border.primary}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  display: flex;
  flex-direction: column;
`;

export const DefectTypeListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  padding: 16px;
`;

export const DefectTypeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 8px;
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

export const PlusIcon = styled(IconPlus)`
  cursor: pointer;
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const EditIcon = styled(IconEdit)`
  cursor: pointer;
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const HeaderContainer = styled.div`
  height: 48px;
`;

export const BodyWrapper = styled.div`
  flex: 1;
  position: relative;
`;
