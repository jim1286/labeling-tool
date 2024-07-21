import React from 'react';
import { Container } from './styles';
import { Divider, ToolBarIcon, Spacer, ESCButton, SaveButton } from '@/components';
import useKeyPointTool from './hook';
import { useBoundStore } from '@/store';
import { useKeyDown } from '@/hooks';

const KeyPointMode: React.FC = () => {
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const { handleSave, handleESC } = useKeyPointTool();

  useKeyDown(() => {
    handleSave();
  }, ['Space']);

  useKeyDown(() => {
    handleESC();
  }, ['Escape']);

  return (
    <Container>
      <ToolBarIcon iconType="dot" iconColor={selectedDefectType?.color} />
      <Spacer size={8} type="vertical" />
      <Divider />
      <ESCButton onESC={handleESC} />
      <Spacer size={12} type="vertical" />
      <SaveButton onSave={handleSave} />
    </Container>
  );
};

export default KeyPointMode;
