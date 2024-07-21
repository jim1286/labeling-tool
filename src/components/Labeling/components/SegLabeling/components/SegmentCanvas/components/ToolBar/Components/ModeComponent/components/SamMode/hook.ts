import { DrawModeEnum, SamModeEnum } from '@/enums';
import { useEscTaskLayer, useSamEditData, useSaveTaskLayer } from '@/hooks';
import { useBoundStore } from '@/store';

export const useSamTool = () => {
  const getSamEditData = useSamEditData();
  const saveTaskLayer = useSaveTaskLayer();
  const escTaskLayer = useEscTaskLayer();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setIsDrawing = useBoundStore((state) => state.setIsDrawing);
  const setSamMode = useBoundStore((state) => state.setSamMode);
  const layerInfo = useBoundStore((state) => state.layerInfo);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const editDataList = useBoundStore((state) => state.editDataList);
  const samMode = useBoundStore((state) => state.samMode);
  const selectedOriginalDefectType = useBoundStore(
    (state) => state.selectedOriginalDefectType
  );

  const handlePoint = () => {
    setSamMode(SamModeEnum.POINT);
  };

  const handleBox = () => {
    setSamMode(SamModeEnum.BOX);
  };

  const handleSave = async () => {
    if (editDataList.length === 0) {
      return;
    }

    const newEditData = await getSamEditData();

    if (!newEditData) {
      return;
    }

    saveTaskLayer(taskLayerList, [newEditData], layerInfo, selectedTaskLayerId);
  };

  const handleESC = () => {
    if (!selectedTaskLayerId) {
      return;
    }

    escTaskLayer(taskLayerList, selectedTaskLayerId, selectedOriginalDefectType);
    setDrawMode(DrawModeEnum.NONE);
    setIsDrawing(false);
  };

  return { samMode, handlePoint, handleBox, handleSave, handleESC };
};

export default useSamTool;
