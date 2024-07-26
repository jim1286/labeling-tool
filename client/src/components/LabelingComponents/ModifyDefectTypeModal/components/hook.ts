import { DefectType } from "@/interface";
import { useBoundStore } from "@/store";

const useModifyState = () => {
  const setDefectTypeList = useBoundStore((state) => state.setDefectTypeList);
  const setSelectedDefectType = useBoundStore(
    (state) => state.setSelectedDefectType
  );
  const setDefaultDefectType = useBoundStore(
    (state) => state.setDefaultDefectType
  );
  const resetModeState = useBoundStore((state) => state.resetModeState);
  const resetLayerState = useBoundStore((state) => state.resetLayerState);

  const modifyState = (modifiedDefectTypeList: DefectType[]) => {
    resetModeState();
    resetLayerState();
    setDefectTypeList(modifiedDefectTypeList);
    setDefaultDefectType(null);
    setSelectedDefectType(null);
  };

  return modifyState;
};

export default useModifyState;
