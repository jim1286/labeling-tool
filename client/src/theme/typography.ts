import { styled } from "styled-components";

export interface TypoProps {
  color?: string;
}

export const PretendardBold = styled.div<TypoProps>`
  font-family: "Pretendard-Bold";
  color: ${({ color, theme }) => color ?? theme.text.primary};
`;

export const PretendardSemiBold = styled.div<TypoProps>`
  font-family: "Pretendard-SemiBold";
  color: ${({ color, theme }) => color ?? theme.text.primary};
`;

export const PretendardMedium = styled.div<TypoProps>`
  font-family: "Pretendard-Medium";
  color: ${({ color, theme }) => color ?? theme.text.primary};
`;

export const PretendardRegular = styled.div<TypoProps>`
  font-family: "Pretendard";
  color: ${({ color, theme }) => color ?? theme.text.primary};
`;

export const Display = styled(PretendardBold)`
  font-size: 48px;
  line-height: 60px;
`;

export const H1 = styled(PretendardBold)`
  font-size: 36px;
  line-height: 45px;
`;

export const H2 = styled(PretendardBold)`
  font-size: 30px;
  line-height: 38px;
`;

export const H3 = styled(PretendardBold)`
  font-size: 24px;
  line-height: 30px;
`;

export const H4 = styled(PretendardSemiBold)`
  font-size: 20px;
  line-height: 30px;
`;

export const H5 = styled(PretendardSemiBold)`
  font-size: 18px;
  line-height: 27px;
`;

export const H6 = styled(PretendardSemiBold)`
  font-size: 16px;
  line-height: 24px;
`;

export const BL = styled(PretendardRegular)`
  font-size: 16px;
  line-height: 24px;
`;

export const BLS = styled(PretendardMedium)`
  font-size: 16px;
  line-height: 24px;
`;

export const BM = styled(PretendardRegular)`
  font-size: 14px;
  line-height: 20px;
`;

export const BMS = styled(PretendardMedium)`
  font-size: 14px;
  line-height: 20px;
`;

export const BS = styled(PretendardRegular)`
  font-size: 12px;
  line-height: 16px;
`;

export const BSS = styled(PretendardMedium)`
  font-size: 12px;
  line-height: 16px;
`;

export const LL = styled(PretendardMedium)`
  font-size: 16px;
  line-height: 16px;
`;

export const LM = styled(PretendardMedium)`
  font-size: 14px;
  line-height: 14px;
`;

export const LS = styled(PretendardMedium)`
  font-size: 12px;
  line-height: 12px;
`;
