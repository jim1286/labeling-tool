import { CustomButton, TooltipWrap } from '@/components';
import React from 'react';

interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
    <TooltipWrap title="레이어 저장(Space)">
      <CustomButton onClick={onSave} type="primary">
        레이어 저장
      </CustomButton>
    </TooltipWrap>
  );
};

export default SaveButton;
