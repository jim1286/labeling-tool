import { MouseModeEnum } from '@/enums';
import { useBoundStore } from '@/store';
import useKeyDown from './useKeyDown';
import useKeyUp from './useKeyUp';

const useMouseMode = () => {
  const setMouseMode = useBoundStore((state) => state.setMouseMode);

  useKeyDown(() => {
    setMouseMode(MouseModeEnum.DRAG);
  }, ['KeyV']);

  useKeyUp(() => {
    setMouseMode(MouseModeEnum.DRAW);
  }, ['KeyV']);
};

export default useMouseMode;
