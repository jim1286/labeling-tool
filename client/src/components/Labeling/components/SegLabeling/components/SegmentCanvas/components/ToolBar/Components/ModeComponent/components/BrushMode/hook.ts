import { BrushModeEnum, DrawModeEnum } from '@/enums';
import { useEscTaskLayer, useSaveTaskLayer } from '@/hooks';
import { TaskLayerData } from '@/interface';
import { useBoundStore } from '@/store';

export const useBrushTool = () => {
  const saveTaskLayer = useSaveTaskLayer();
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setBrushSize = useBoundStore((state) => state.setBrushSize);
  const setBrushMode = useBoundStore((state) => state.setBrushMode);
  const setIsDrawing = useBoundStore((state) => state.setIsDrawing);
  const escTaskLayer = useEscTaskLayer();
  const layerInfo = useBoundStore((state) => state.layerInfo);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const editDataList = useBoundStore((state) => state.editDataList);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const brushMode = useBoundStore((state) => state.brushMode);
  const brushSize = useBoundStore((state) => state.brushSize);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const selectedOriginalDefectType = useBoundStore(
    (state) => state.selectedOriginalDefectType
  );

  const handlePainterDecrease = () => {
    if (brushSize > 10) {
      setBrushSize(brushSize - 1);
    }
  };

  const handlePainterIncrease = () => {
    if (brushSize < 150) {
      setBrushSize(brushSize + 1);
    }
  };

  const handleBrush = () => {
    setBrushMode(BrushModeEnum.PAINT);
  };

  const handleEraser = () => {
    setBrushMode(BrushModeEnum.ERASE);
  };

  const handleSave = () => {
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
    setBrushMode(BrushModeEnum.PAINT);
  };

  const handleESC = () => {
    if (!selectedTaskLayerId) {
      return;
    }

    escTaskLayer(taskLayerList, selectedTaskLayerId, selectedOriginalDefectType);
    setDrawMode(DrawModeEnum.NONE);
    setIsDrawing(false);
  };

  return {
    brushSize,
    brushMode,
    handlePainterDecrease,
    handlePainterIncrease,
    handleBrush,
    handleEraser,
    handleSave,
    handleESC,
  };
};
