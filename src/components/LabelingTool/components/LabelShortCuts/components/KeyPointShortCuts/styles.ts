import { BS } from "@/theme";
import { styled } from "styled-components";

export const TextIcon = styled(BS)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
  height: 24px;
  background: ${({ theme }) => theme.bg.surface.quaternary};
  border-radius: 4px;
  font-weight: bold;
`;
