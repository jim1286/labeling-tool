import React from 'react';
import { Container } from './styles';
import { Divider, ToolBarIcon, Spacer, ESCButton } from '@/components';
import useBoxTool from './hook';
import { useBoundStore } from '@/store';
import { useKeyDown } from '@/hooks';

const BoxMode: React.FC = () => {
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const { handleESC } = useBoxTool();

  useKeyDown(() => {
    handleESC();
  }, ['Escape']);

  return (
    <Container>
      <ToolBarIcon iconType="box" iconColor={selectedDefectType?.color} />
      <Spacer size={8} type="vertical" />
      <Divider />
      <ESCButton onESC={handleESC} />
    </Container>
  );
};

export default BoxMode;
