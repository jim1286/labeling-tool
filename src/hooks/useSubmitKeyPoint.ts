import { Coordinates, KeyPointData, TaskLayer } from '@/interface';

const useSubmitKeyPoint = () => {
  const convertKeyPointData = (taskLayerList: TaskLayer[]) => {
    const bboxList: number[][] = [];
    const keyPointDataList: Coordinates[][] = [];
    const labelingList = taskLayerList.map((taskLayer) => taskLayer.data);

    labelingList.forEach((label) => {
      const labelData = label.map((ele) => (ele.data as KeyPointData).coordinates);
      const xList = labelData.map((ele) => ele[0]);
      const yList = labelData.map((ele) => ele[1]);

      const minX = Math.min(...xList);
      const maxX = Math.max(...xList);
      const minY = Math.min(...yList);
      const maxY = Math.max(...yList);

      bboxList.push([minX, minY, maxX, maxY]);
      keyPointDataList.push(labelData);
    });

    return { bboxList, keyPointDataList };
  };

  return convertKeyPointData;
};

export default useSubmitKeyPoint;
