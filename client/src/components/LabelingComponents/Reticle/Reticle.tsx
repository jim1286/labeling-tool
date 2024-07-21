import React from 'react';
import { CrossHairX, CrossHairY } from './styles';
import { useBoundStore } from '@/store';

interface ReticleProps {
  canvasEnter: boolean;
  crosshairX: React.RefObject<HTMLDivElement>;
  crosshairY: React.RefObject<HTMLDivElement>;
}

const Reticle: React.FC<ReticleProps> = ({ canvasEnter, crosshairX, crosshairY }) => {
  const enableReticle = useBoundStore((state) => state.enableReticle);
  const imageSize = useBoundStore((state) => state.imageSize);
  const disable = !canvasEnter || !enableReticle;

  if (disable) {
    return null;
  }

  return (
    <>
      <CrossHairX height={imageSize.height} ref={crosshairX} />
      <CrossHairY width={imageSize.width} ref={crosshairY} />
    </>
  );
};

export default Reticle;
