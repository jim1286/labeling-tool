import React from 'react';
import { CustomButton, TooltipWrap } from '@/components';

interface ESCButtonProps {
  onESC: () => void;
}

const ESCButton: React.FC<ESCButtonProps> = ({ onESC }) => {
  return (
    <TooltipWrap title="종료(ESC)">
      <CustomButton onClick={onESC} type="default">
        종료
      </CustomButton>
    </TooltipWrap>
  );
};

export default ESCButton;
