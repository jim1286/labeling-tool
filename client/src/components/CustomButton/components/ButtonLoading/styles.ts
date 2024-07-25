import { styled } from "styled-components";

export const Loading = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export const Spinner = styled.div`
  border-width: 3px;
  border-style: solid;
  border-color: ${({ theme }) => theme.icon.tertiary} transparent transparent
    transparent;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  z-index: 999;
  position: absolute;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerBackGround = styled.div`
  border-width: 3px;
  border-style: solid;
  border-color: #444b52;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
`;
