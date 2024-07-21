import React from 'react';
import { Container } from './styles';
import { SamModeEnum } from '@/enums';
import {
  Divider,
  ToolBarIcon,
  Spacer,
  ESCButton,
  SaveButton,
  TooltipWrap,
} from '@/components';
import useSamTool from './hook';
import { useBoundStore } from '@/store';
import { useKeyDown } from '@/hooks';

const SamMode: React.FC = () => {
  const isDrawing = useBoundStore((state) => state.isDrawing);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const { samMode, handlePoint, handleBox, handleSave, handleESC } = useSamTool();

  useKeyDown(() => {
    if (isDrawing) {
      return;
    }

    handlePoint();
  }, ['KeyQ']);

  useKeyDown(() => {
    if (isDrawing) {
      return;
    }

    handleBox();
  }, ['KeyW']);

  useKeyDown(() => {
    if (isDrawing) {
      return;
    }

    handleSave();
  }, ['Space']);

  useKeyDown(() => {
    handleESC();
  }, ['Escape']);

  return (
    <Container>
      <TooltipWrap title="포인트(Q)">
        <ToolBarIcon
          iconType="sam-point"
          iconColor={selectedDefectType?.color}
          onClick={handlePoint}
          isClicked={samMode === SamModeEnum.POINT}
        />
      </TooltipWrap>
      <TooltipWrap title="박스(W)">
        <ToolBarIcon
          iconType="sam-box"
          iconColor={selectedDefectType?.color}
          onClick={handleBox}
          isClicked={samMode === SamModeEnum.BOX}
        />
      </TooltipWrap>
      <Divider />
      <ESCButton onESC={handleESC} />
      <Spacer size={12} type="vertical" />
      <SaveButton onSave={handleSave} />
    </Container>
  );
};

export default SamMode;
