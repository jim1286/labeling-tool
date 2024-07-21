import { DrawModeEnum, MouseModeEnum } from '@/enums';
import { useBoundStore } from '@/store';

export const useCursorStyle = (isDragging: boolean) => {
  const drawMode = useBoundStore((state) => state.drawMode);
  const mouseMode = useBoundStore((state) => state.mouseMode);

  return (() => {
    if (isDragging) {
      return {
        cursor: 'grabbing',
      };
    }

    return {
      cursor:
        drawMode === DrawModeEnum.NONE || mouseMode === MouseModeEnum.DRAG
          ? 'grab'
          : drawMode === DrawModeEnum.BRUSH
            ? 'none'
            : 'crosshair',
    };
  })();
};
