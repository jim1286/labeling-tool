import { LabelingModeEnum } from '@/enums';
import { LayerInfo, TaskLayer, TaskLayerData } from '@/interface';
import { useBoundStore } from '@/store';
import { cloneDeep } from 'lodash';
import useSetNewTaskLayer from './useSetNewTaskLayer';
import useClearLayerState from './useClearLayerState';

const useSaveTaskLayer = () => {
  const clearLayerState = useClearLayerState();
  const setNewTaskLayer = useSetNewTaskLayer();
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);

  const saveTaskLayer = (
    taskLayerList: TaskLayer[],
    editDataList: TaskLayerData[],
    layerInfo: LayerInfo,
    selectedTaskLayerId: string | null
  ) => {
    const newTaskLayerList = cloneDeep(taskLayerList);
    const selectedTaskLayer = newTaskLayerList.find(
      (taskLayer) => taskLayer.id === selectedTaskLayerId
    );

    if (!selectedTaskLayer || !selectedDefectType) {
      return;
    }

    clearLayerState();

    const isTaskLayerDataEmpty =
      editDataList.length === 0 && selectedTaskLayer.data.length === 0;
    const isLabelErased =
      labelingMode === LabelingModeEnum.SEGMENTATION && layerInfo.size === 0;

    if (isTaskLayerDataEmpty || isLabelErased) {
      newTaskLayerList.pop();

      setNewTaskLayer(newTaskLayerList, selectedDefectType);
      return;
    }

    selectedTaskLayer.data.push(...editDataList);
    setNewTaskLayer(newTaskLayerList, selectedDefectType);
  };

  return saveTaskLayer;
};

export default useSaveTaskLayer;
