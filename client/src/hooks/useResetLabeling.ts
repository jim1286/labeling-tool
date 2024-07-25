import { useBoundStore } from "@/store";

const useResetLabeling = () => {
  const resetModeState = useBoundStore((state) => state.resetModeState);
  const resetLayerState = useBoundStore((state) => state.resetLayerState);
  const resetLabelingState = useBoundStore((state) => state.resetLabelingState);

  const resetLabeling = () => {
    // resetLabelingSettingState가 없는 이유는 세팅 값을 라벨링하는 동안 유지하기 위해서.
    resetLayerState();
    resetModeState();
    resetLabelingState();
  };

  return resetLabeling;
};

export default useResetLabeling;
