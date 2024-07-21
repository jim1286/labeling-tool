import { styled } from "styled-components";
import { IconEye, IconEyeClosed, IconTrash } from "@tabler/icons-react";

export const Container = styled.div`
  width: 48px;
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  gap: 8px;
  padding-left: 0;
`;

export const EyeInvisibleIcon = styled(IconEyeClosed)`
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const EyeIcon = styled(IconEye)`
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;

export const DeleteIcon = styled(IconTrash)`
  color: ${({ theme }) => theme.icon.tertiary};

  &:hover {
    color: ${({ theme }) => theme.icon.primary};
  }
`;
