import { useBoundStore } from '@/store';

const useResetLabeling = () => {
  const resetModeState = useBoundStore((state) => state.resetModeState);
  const resetLayerState = useBoundStore((state) => state.resetLayerState);
  const resetLabelingState = useBoundStore((state) => state.resetLabelingState);

  const resetLabeling = () => {
    resetLayerState();
    resetModeState();
    resetLabelingState();
  };

  return resetLabeling;
};

export default useResetLabeling;
