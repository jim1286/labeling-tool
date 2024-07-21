import { DrawModeEnum } from '@/enums';
import { useBoundStore } from '@/store';

export const useCursorStyle = (isDragging: boolean) => {
  const drawMode = useBoundStore((state) => state.drawMode);

  return (() => {
    if (isDragging) {
      return {
        cursor: 'grabbing',
      };
    }

    return {
      cursor: drawMode === DrawModeEnum.NONE ? 'grab' : 'crosshair',
    };
  })();
};
