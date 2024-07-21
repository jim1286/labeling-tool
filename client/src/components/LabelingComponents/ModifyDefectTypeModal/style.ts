import { styled } from "styled-components";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export const EditIcon = styled(IconEdit)`
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
