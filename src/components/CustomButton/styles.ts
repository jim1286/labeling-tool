import { styled } from "styled-components";

interface ButtonContainerProps {
  width?: string;
  position?: "left" | "right";
  isLoading?: boolean;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  border-radius: 4px;
  border: none;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ position }) =>
    position && position === "left" ? "row" : "row-reverse"};
  width: ${({ width }) => width && `${width}`};
  color: "#FFFFFF";
  cursor: ${({ isLoading }) => (isLoading ? "not-allowed" : "pointer")};

  * {
    color: "#FFFFFF";
  }

  &.sm {
    font-family: "Pretendard-Medium";
    font-size: 12px !important;
    line-height: 12px;
    & > * {
      font-family: "Pretendard-Medium";
      font-size: 12px !important;
    }

    height: 24px;
    padding: ${({ position }) =>
      position
        ? position === "left"
          ? "0 8px 0 8px"
          : "0 8px 0 8px"
        : "0 8px"};
  }

  &.md {
    font-family: "Pretendard-Medium";
    font-size: 14px !important;
    line-height: 14px;
    * {
      font-family: "Pretendard-Medium";
      font-size: 14px !important;
    }

    height: 32px;
    padding: ${({ position }) =>
      position
        ? position === "left"
          ? "0 12px 0 8px"
          : "0 8px 0 12px"
        : "0 12px"};
  }

  &.lg {
    font-family: "Pretendard-Medium";
    font-size: 16px !important;
    line-height: 16px;
    * {
      font-family: "Pretendard-Medium";
      font-size: 16px !important;
    }

    height: 40px;
    padding: ${({ position }) =>
      position
        ? position === "left"
          ? "0 16px 0 12px"
          : "0 12px 0 16px"
        : "0 16px"};
  }

  &.icon-sm {
    padding: 0 8px !important;
  }

  &.icon-md {
    padding: 0 6px !important;
  }

  &.icon-lg {
    padding: 0 4px !important;
  }

  &.primary-rest {
    * {
      color: ${({ theme }) => theme.text.inverse};
    }

    background: ${({ theme }) => theme.bg.fill.brand.rest};

    &:hover {
      background: ${({ theme }) => theme.bg.fill.brand.hover};
    }

    &:active {
      background: ${({ theme }) => theme.bg.fill.brand.active};
    }
  }

  &.danger-rest {
    * {
      color: ${({ theme }) => theme.text.inverse};
    }

    background: ${({ theme }) => theme.bg.fill.danger.rest};

    &:hover {
      background: ${({ theme }) => theme.bg.fill.danger.hover};
    }

    &:active {
      background: ${({ theme }) => theme.bg.fill.danger.active};
    }
  }

  &.default-rest {
    background: ${({ theme }) => theme.bg.fill.secondary.rest};
    color: ${({ theme }) => theme.text.primary};

    * {
      color: ${({ theme }) => theme.text.primary};
    }

    &:hover {
      background: ${({ theme }) => theme.bg.fill.secondary.hover};
    }

    &:active {
      background: ${({ theme }) => theme.bg.fill.secondary.active};
    }
  }

  &.ghost-rest {
    background: none;
    color: ${({ theme }) => theme.text.primary};

    * {
      color: ${({ theme }) => theme.text.primary};
    }

    &:hover {
      color: ${({ theme }) => theme.text.secondary};
    }

    &:active {
      color: ${({ theme }) => theme.text.tertiary};
    }
  }

  &.ghost-disabled {
    cursor: not-allowed;

    * {
      color: ${({ theme }) => theme.text.disabled} !important;
    }

    &:hover {
      color: ${({ theme }) => theme.text.disabled} !important;
    }
  }

  &.subtle-rest {
    background: none;
    color: ${({ theme }) => theme.text.primary};

    &:hover {
      background: ${({ theme }) => theme.bg.fill.primary.hover};
    }

    &:active {
      background: ${({ theme }) => theme.bg.fill.primary.active};
    }
  }

  &.button-disabled {
    cursor: not-allowed;

    background: ${({ theme }) => theme.bg.fill.disabled} !important;
    color: ${({ theme }) => theme.text.disabled} !important;

    * {
      color: ${({ theme }) => theme.text.disabled} !important;
    }

    &:hover {
      background: ${({ theme }) => theme.bg.fill.disabled} !important;
    }

    &:active {
      background: ${({ theme }) => theme.bg.fill.disabled} !important;
    }
  }
`;
