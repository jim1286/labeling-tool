import React from 'react';
import { Container, DefectName, Dot, ShortCutNumber } from './styles';
import { DefectType } from '@/interface';

interface DefectLayerProps {
  index: number;
  defectType: DefectType;
  isClicked?: boolean;
  onClick?: (defectType: DefectType) => void;
}

const DefectLayer: React.FC<DefectLayerProps> = ({
  index,
  isClicked,
  defectType,
  onClick,
}) => {
  return (
    <Container
      isClicked={isClicked}
      onClick={() => {
        if (!onClick) {
          return;
        }
        onClick(defectType);
      }}
    >
      <Dot color={defectType.color} />
      <DefectName>{defectType.name}</DefectName>
      {index && <ShortCutNumber>{index}</ShortCutNumber>}
    </Container>
  );
};

export default DefectLayer;
