import { DrawModeEnum } from '@/enums';
import { useBoundStore } from '@/store';

export const useBoxTool = () => {
  const setDrawMode = useBoundStore((state) => state.setDrawMode);

  const handleESC = () => {
    setDrawMode(DrawModeEnum.NONE);
  };

  return {
    handleESC,
  };
};

export default useBoxTool;
