import React from 'react';
import { Container } from './styles';
import { Canvas } from './components';

interface PainterProps {
  onCanvasMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Painter: React.FC<PainterProps> = ({ onCanvasMouseMove }) => {
  return (
    <Container onMouseMove={onCanvasMouseMove}>
      <Canvas />
    </Container>
  );
};

export default Painter;
