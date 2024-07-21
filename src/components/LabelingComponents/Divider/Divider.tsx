import React from 'react';
import { Container } from './styles';

interface DividerProps {
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({ style }) => {
  return <Container style={style} />;
};

export default Divider;
