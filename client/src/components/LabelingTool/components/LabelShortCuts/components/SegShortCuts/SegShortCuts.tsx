import { FlexColumn, FlexRow } from "@/components";
import React from "react";
import { TextIcon } from "./styles";
import { BL, BM, H5 } from "@/theme";

const SegShortCuts: React.FC = () => {
  return (
    <FlexColumn
      width="100%"
      height="90vh"
      gap={25}
      style={{ overflowY: "auto", paddingRight: "20px" }}
    >
      <H5>단축키</H5>
      <FlexColumn width="100%" gap={9}>
        <BL>작업</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>레이어 저장</BM>
          <FlexRow gap={4}>
            <TextIcon>Space</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>그리기 종료</BM>
          <FlexRow gap={4}>
            <TextIcon>Esc</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>작업 저장</BM>
          <FlexRow gap={4}>
            <TextIcon>Ctrl</TextIcon>
            <BM>+</BM>
            <TextIcon>S</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>자동 저장</BM>
          <FlexRow gap={4}>
            <TextIcon>Ctrl</TextIcon>
            <BM>+</BM>
            <TextIcon>F</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>스마트 라벨링 생성</BM>
          <FlexRow gap={4}>
            <TextIcon>Ctrl</TextIcon>
            <BM>+</BM>
            <TextIcon>Tab</TextIcon>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>이미지</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>이미지 탐색</BM>
          <FlexRow gap={4}>
            <TextIcon>V</TextIcon>
            <BM>+</BM>
            <BM>드래그</BM>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>이미지 축소</BM>
          <BM>마우스 휠 다운</BM>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>이미지 확대</BM>
          <BM>마우스 휠 업</BM>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>이미지 목록 이동</BM>
          <FlexRow gap={4}>
            <TextIcon>A</TextIcon>
            <BM>/</BM>
            <TextIcon>D</TextIcon>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>레이블 지정</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>레이블 선택</BM>
          <FlexRow gap={4}>
            <TextIcon>숫자 클릭 / 레이블 클릭</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>스마트 라벨링 모드 켜기</BM>
          <FlexRow gap={4}>
            <TextIcon>Q</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>브러시 모드 켜기</BM>
          <FlexRow gap={4}>
            <TextIcon>W</TextIcon>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>스마트 라벨링 모드</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>포인터</BM>
          <FlexRow gap={4}>
            <TextIcon>Q</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>박스</BM>
          <FlexRow gap={4}>
            <TextIcon>W</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>미리보기</BM>
          <FlexRow gap={4}>
            <TextIcon>Shift</TextIcon>
            <BM>+</BM>
            <BM>드래그</BM>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>브러시 모드</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>브리시</BM>
          <FlexRow gap={4}>
            <TextIcon>Q</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>지우개</BM>
          <FlexRow gap={4}>
            <TextIcon>W</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>브러시 크기 감소 / 증가</BM>
          <FlexRow gap={4}>
            <TextIcon>[</TextIcon>
            <BM>/</BM>
            <TextIcon>]</TextIcon>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>도구</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>십자선 활성화</BM>
          <TextIcon>T</TextIcon>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>실행취소</BM>
          <FlexRow gap={4}>
            <TextIcon>Ctrl</TextIcon>
            <BM>+</BM>
            <TextIcon>Z</TextIcon>
          </FlexRow>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>재실행</BM>
          <FlexRow gap={4}>
            <TextIcon>Ctrl</TextIcon>
            <BM>+</BM>
            <TextIcon>Shift</TextIcon>
            <BM>+</BM>
            <TextIcon>Z</TextIcon>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>분류</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>기본</BM>
          <TextIcon>Z</TextIcon>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>학습</BM>
          <TextIcon>X</TextIcon>
        </FlexRow>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>검증</BM>
          <TextIcon>C</TextIcon>
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  );
};

export default SegShortCuts;
