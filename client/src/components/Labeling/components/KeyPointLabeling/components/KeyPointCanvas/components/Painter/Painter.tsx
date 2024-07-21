import React from 'react';
import { Container } from './styles';
import { Canvas } from './components';
import { useBoundStore } from '@/store';

interface PainterProps {
  onCanvasMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Painter: React.FC<PainterProps> = ({ onCanvasMouseMove }) => {
  const taskLayerList = useBoundStore((state) => state.taskLayerList);

  return (
    <Container onMouseMove={onCanvasMouseMove}>
      {taskLayerList
        .filter((taskLayer) => !taskLayer.hidden)
        .map((taskLayer) => (
          <Canvas key={taskLayer.id} taskLayer={taskLayer} />
        ))}
    </Container>
  );
};

export default Painter;
