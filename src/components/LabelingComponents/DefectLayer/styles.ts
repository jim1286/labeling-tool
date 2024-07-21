import { styled } from "styled-components";
import { BS, BSS } from "@/theme";

interface DefectItemProps {
  isClicked: boolean | undefined;
}

interface DotProps {
  color: string;
}

export const Container = styled.div<DefectItemProps>`
  display: flex;
  width: 100%;
  height: 32px;
  background: ${({ isClicked, theme }) =>
    isClicked && theme.bg.fill.primary.active};
  border-radius: 4px;
  padding: 8px;
  gap: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShortCutNumber = styled(BSS)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.bg.surface.tertiary};
  border-radius: 2px;
`;

export const DefectName = styled(BS)`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Dot = styled.div<DotProps>`
  width: 16px;
  height: 16px;
  padding: 3px;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    display: block;
    border-radius: 2px;
    background: ${({ color }) => color};
  }
`;
