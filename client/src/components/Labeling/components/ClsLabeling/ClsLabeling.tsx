import React from "react";
import { CanvasWrapper, Container, DefectTypeWrapper } from "./styles";
import { ClsCanvas } from "./components";
import { useInitLabeling } from "@/hooks";
import { Spin } from "antd";
import { DefectTypeListComponent } from "@/components";

const ClsLabeling: React.FC = () => {
  const { isLoading } = useInitLabeling();

  return (
    <Container>
      <DefectTypeWrapper>
        <DefectTypeListComponent />
      </DefectTypeWrapper>
      <CanvasWrapper>
        <ClsCanvas />
      </CanvasWrapper>
      {isLoading && <Spin tip="로딩 중..." size="large" fullscreen />}
    </Container>
  );
};

export default ClsLabeling;
