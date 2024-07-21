import { FlexColumn, FlexRow } from '@/components';
import React from 'react';
import { TextIcon } from './styles';
import { BM, BL } from '@/theme';

const ClsShortCuts: React.FC = () => {
  return (
    <FlexColumn
      width="100%"
      height="85vh"
      gap={25}
      style={{ overflowY: 'auto', paddingRight: '20px' }}
    >
      <FlexColumn width="100%" gap={9}>
        <BL>작업</BL>
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

export default ClsShortCuts;
