import { useBoundStore } from '@/store';

const useClearLayerState = () => {
  const clearLayerInfo = useBoundStore((state) => state.clearLayerInfo);
  const clearSelectedDefectType = useBoundStore((state) => state.clearSelectedDefectType);
  const clearEditDataList = useBoundStore((state) => state.clearEditDataList);
  const clearEditDataHistoryList = useBoundStore(
    (state) => state.clearEditDataHistoryList
  );
  const clearSelectedTaskLayerId = useBoundStore(
    (state) => state.clearSelectedTaskLayerId
  );

  const clearLayerState = () => {
    clearLayerInfo();
    clearEditDataList();
    clearEditDataHistoryList();
    clearSelectedTaskLayerId();
    clearSelectedDefectType();
  };

  return clearLayerState;
};

export default useClearLayerState;
