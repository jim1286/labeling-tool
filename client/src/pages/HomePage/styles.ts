import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #141414;
  gap: 50px;
`;

export const LabelingMode = styled.div`
  width: 80vw;
  height: 80vh;
  border: ${({ theme }) => `5px solid ${theme.border.primary}`};
  border-radius: 10px;
`;
