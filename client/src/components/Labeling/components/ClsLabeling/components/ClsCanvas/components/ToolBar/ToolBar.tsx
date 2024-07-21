import React from "react";
import { Container, ModeContainer } from "./styles";
import { ModeComponent } from "./components";

const ToolBar: React.FC = () => {
  return (
    <Container>
      <ModeContainer>
        <ModeComponent />
      </ModeContainer>
    </Container>
  );
};

export default ToolBar;
