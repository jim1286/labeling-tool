import React from 'react';
import { Container } from './styles';
import { useBoundStore } from '@/store';
import { DrawModeEnum } from '@/enums';
import { BoxMode } from './components';

const ModeComponent: React.FC = () => {
  const drawMode = useBoundStore((state) => state.drawMode);

  const Mode = (() => {
    switch (drawMode) {
      case DrawModeEnum.BOX: {
        return <BoxMode />;
      }
    }
  })();

  return <Container>{Mode}</Container>;
};

export default ModeComponent;
