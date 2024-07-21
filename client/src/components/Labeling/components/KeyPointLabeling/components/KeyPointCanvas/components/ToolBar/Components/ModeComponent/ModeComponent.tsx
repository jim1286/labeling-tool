import React from 'react';
import { Container } from './styles';
import { DrawModeEnum } from '@/enums';
import { KeyPointMode } from './components';
import { useBoundStore } from '@/store';

const ModeComponent: React.FC = () => {
  const drawMode = useBoundStore((state) => state.drawMode);

  const Mode = (() => {
    switch (drawMode) {
      case DrawModeEnum.KEY_POINT: {
        return <KeyPointMode />;
      }
    }
  })();

  return <Container>{Mode}</Container>;
};

export default ModeComponent;
