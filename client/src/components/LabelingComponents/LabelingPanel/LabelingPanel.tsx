import React from "react";
import {
  Container,
  DefectTypeListContainer,
  TaskLayerInfoContainer,
  TaskLayerListContainer,
} from "./styles";
import {
  TaskLayerListComponent,
  TaskLayerInfo,
  DefectTypeListComponent,
} from "@/components";

const LabelingPanel: React.FC = () => {
  return (
    <Container>
      <DefectTypeListContainer>
        <DefectTypeListComponent />
      </DefectTypeListContainer>
      <TaskLayerInfoContainer>
        <TaskLayerInfo />
      </TaskLayerInfoContainer>
      <TaskLayerListContainer>
        <TaskLayerListComponent />
      </TaskLayerListContainer>
    </Container>
  );
};

export default LabelingPanel;
