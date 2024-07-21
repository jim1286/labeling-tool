import React from "react";
import { Container, ModeContainer, ToolContainer } from "./styles";
import { ModeComponent } from "./Components";
import { ToolComponent } from "@/components";

const ToolBar: React.FC = () => {
  return (
    <Container>
      <ModeContainer>
        <ModeComponent />
      </ModeContainer>
      <ToolContainer>
        <ToolComponent />
      </ToolContainer>
    </Container>
  );
};

export default ToolBar;
