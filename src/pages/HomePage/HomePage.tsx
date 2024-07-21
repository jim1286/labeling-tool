import React from "react";
import {
  Container,
  Explanation,
  LabelingMode,
  ModeText,
  Title,
} from "./styles";
import { FlexColumn, FlexRow } from "@/components";
import { useTheme } from "styled-components";
import { H1 } from "@/theme";
import { LabelingModeEnum } from "@/enums";
import { TypeContainer } from "./components";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const theme = useTheme();

  return (
    <Container>
      <H1>라벨링 모드 선택</H1>
      <LabelingMode>
        <FlexColumn width="100%" height="100%">
          <FlexRow
            width="100%"
            height="50%"
            style={{ borderBottom: `5px solid ${theme.border.primary}` }}
          >
            <TypeContainer
              labelingMode={LabelingModeEnum.CLASSIFICATION}
              purpose="이미지나 객체를 특정 클래스(카테고리)로 분류하는 작업."
              work="이미지 전체를 하나의 레이블로 분류."
              example="고양이와 개를 분류하는 작업에서는 각 이미지가 '고양이'
                  또는 '개'라는 하나의 레이블을 가짐."
              result="이미지 전체에 대한 단일 레이블."
              style={{ borderRight: `5px solid ${theme.border.primary}` }}
            />
            <TypeContainer
              labelingMode={LabelingModeEnum.OBJECT_DETECTION}
              purpose="이미지 내에서 여러 객체의 위치와 종류를 탐지하는 작업."
              work="각 객체의 경계 상자를 지정하고, 객체를 분류."
              example="이미지에서 여러 개의 자동차와 보행자를 찾아 각각의 경계
                  상자와 레이블을 부여."
              result="이미지 내 여러 객체의 위치 (Bounding Box)와 레이블."
            />
          </FlexRow>
          <FlexRow width="100%" height="50%">
            <TypeContainer
              labelingMode={LabelingModeEnum.KEY_POINT}
              purpose="이미지 내에서 객체의 주요 지점을 탐지하는 작업."
              work="객체의 특징적인 점들을 식별하고 표시."
              example="얼굴 인식에서 눈, 코, 입 등의 위치를 특정 지점으로 표시."
              result="이미지 내 주요 지점들의 좌표."
              style={{ borderRight: `5px solid ${theme.border.primary}` }}
            />
            <TypeContainer
              labelingMode={LabelingModeEnum.SEGMENTATION}
              purpose="이미지 내 각 픽셀을 특정 클래스에 할당하여 세부적인
                  분류를 하는 작업."
              work="픽셀 단위로 라벨을 지정하여 이미지의 모든 부분을 특정
                  클래스에 할당."
              example="자동차 사진에서 자동차 부분은 자동차로, 도로 부분은
                  도로로 픽셀 단위로 나누어 라벨링."
              result="이미지 내 모든 픽셀이 레이블된 세부 마스크."
            />
          </FlexRow>
        </FlexColumn>
      </LabelingMode>
    </Container>
  );
};

export default HomePage;
