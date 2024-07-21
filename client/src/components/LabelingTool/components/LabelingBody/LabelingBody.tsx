import React from "react";
import { Container, HeaderContainer, LabelingContainer } from "./styles";
import { LabelingHeader } from "./components";
import { Labeling } from "@/components";

const LabelingBody: React.FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <LabelingHeader />
      </HeaderContainer>
      <LabelingContainer>
        <Labeling />
      </LabelingContainer>
    </Container>
  );
};

export default LabelingBody;
