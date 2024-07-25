import { DrawModeEnum } from '@/enums';
import { useEscTaskLayer, useSaveTaskLayer } from '@/hooks';
import { TaskLayerData } from '@/interface';
import { useBoundStore } from '@/store';

export const useKeyPointTool = () => {
  const saveTaskLayer = useSaveTaskLayer();
  const escTaskLayer = useEscTaskLayer();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const layerInfo = useBoundStore((state) => state.layerInfo);
  const lineWidth = useBoundStore((state) => state.lineWidth);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const editDataList = useBoundStore((state) => state.editDataList);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const selectedOriginalDefectType = useBoundStore(
    (state) => state.selectedOriginalDefectType
  );

  const handleSave = async () => {
    const isNotingEdited =
      editDataList.length === 0 &&
      selectedOriginalDefectType?.name === selectedDefectType?.name;

    if (isNotingEdited) {
      return;
    }

    saveTaskLayer(
      taskLayerList,
      editDataList as TaskLayerData[],
      layerInfo,
      selectedTaskLayerId
    );
  };

  const handleESC = () => {
    if (!selectedTaskLayerId) {
      return;
    }

    escTaskLayer(taskLayerList, selectedTaskLayerId, selectedOriginalDefectType);
    setDrawMode(DrawModeEnum.NONE);
  };

  return {
    lineWidth,
    handleSave,
    handleESC,
  };
};
export default useKeyPointTool;
