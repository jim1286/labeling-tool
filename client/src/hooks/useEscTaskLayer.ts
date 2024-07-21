import { TaskLayer, DefectType } from '@/interface';
import { useBoundStore } from '@/store';
import { cloneDeep } from 'lodash';

const useEscTaskLayer = () => {
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);

  const escLayer = (
    taskLayerList: TaskLayer[],
    selectedTaskLayerId: string,
    selectedOriginalDefectType: DefectType | null
  ) => {
    const selectedTaskLayer = taskLayerList.find(
      (taskLayer) => taskLayer.id === selectedTaskLayerId
    );

    if (!selectedTaskLayer) {
      return;
    }

    const newTaskLayerList = cloneDeep(taskLayerList);

    if (selectedTaskLayer.data.length === 0) {
      newTaskLayerList.pop();

      setTaskLayerList(newTaskLayerList);
      return;
    }

    if (!selectedOriginalDefectType) {
      return;
    }

    if (selectedTaskLayer.defectType.name !== selectedOriginalDefectType.name) {
      const newTaskLayer = newTaskLayerList.find(
        (taskLayer) => taskLayer.id === selectedTaskLayerId
      );

      if (!newTaskLayer) {
        return;
      }

      newTaskLayer.defectType = selectedOriginalDefectType;
      setTaskLayerList(newTaskLayerList);
    }
  };

  return escLayer;
};

export default useEscTaskLayer;
