import React, { memo, useEffect, useRef, useState } from 'react';
import { Container } from './styles';
import { useBoundStore } from '@/store';
import { Canvas } from './components';

const Painter: React.FC = () => {
  const scale = useBoundStore((state) => state.scale);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const prevScale = useRef<number>(0);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsResizing(false);
    }, 100);

    return () => clearInterval(timer);
  }, [scale]);

  const handleWheel = () => {
    if (prevScale.current === scale) {
      return;
    }

    prevScale.current = scale;
    setIsResizing(true);
  };

  return (
    <Container onWheel={handleWheel}>
      {!isResizing &&
        taskLayerList
          .filter((taskLayer) => !taskLayer.hidden)
          .map((taskLayer) => <Canvas key={taskLayer.id} taskLayer={taskLayer} />)}
    </Container>
  );
};

export default memo(Painter);
