import { FlexColumn, FlexRow } from '@/components';
import React from 'react';
import { TextIcon } from './styles';
import { BL, BM, H5 } from '@/theme';

const OdShortCuts: React.FC = () => {
  return (
    <FlexColumn
      width="100%"
      height="85vh"
      gap={25}
      style={{ overflowY: 'auto', paddingRight: '20px' }}
    >
      <H5>단축키</H5>
      <FlexColumn width="100%" gap={9}>
        <BL>작업</BL>
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
      </FlexColumn>
      <FlexColumn width="100%" gap={9}>
        <BL>이미지</BL>
        <FlexRow width="100%" justifyContent="space-between">
          <BM>이미지 탐색</BM>
          <FlexRow gap={4}>
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

export default OdShortCuts;
