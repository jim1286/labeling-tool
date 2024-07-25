import { TaskLayer, DefectType } from '@/interface';
import { useBoundStore } from '@/store';
import { LabelingUtil } from '@/utils';

const useSetNewTaskLayer = () => {
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);
  const setSelectedTaskLayerId = useBoundStore((state) => state.setSelectedTaskLayerId);
  const setSelectedDefectType = useBoundStore((state) => state.setSelectedDefectType);
  const setDefaultDefectType = useBoundStore((state) => state.setDefaultDefectType);

  const setNewTaskLayer = (taskLayerList: TaskLayer[], defectType: DefectType) => {
    const newTaskLayer = LabelingUtil.getNewTaskLayer(defectType);

    setSelectedTaskLayerId(newTaskLayer.id);
    setDefaultDefectType(newTaskLayer.defectType);
    setSelectedDefectType(newTaskLayer.defectType);
    setTaskLayerList([...taskLayerList, newTaskLayer]);
    return;
  };

  return setNewTaskLayer;
};

export default useSetNewTaskLayer;
