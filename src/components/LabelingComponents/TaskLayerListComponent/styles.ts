import { styled } from "styled-components";
import { IconEyeClosed, IconEye, IconTrash } from "@tabler/icons-react";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-right: ${({ theme }) => `1px solid ${theme.border.primary}`};
  flex-direction: column;
  overflow: hidden;
`;

export const TaskLayerTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.primary}`};
  padding: 16px;
`;

export const LayerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding: 8px;

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

export const EyeInvisibleIcon = styled(IconEyeClosed)`
  cursor: pointer;
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const EyeIcon = styled(IconEye)`
  cursor: pointer;
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const DeleteIcon = styled(IconTrash)`
  cursor: pointer;
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 48px;
`;

export const BodyContainer = styled.div`
  flex: 1;
  position: relative;
`;
