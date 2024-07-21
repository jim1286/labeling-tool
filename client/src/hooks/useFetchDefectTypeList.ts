import { useBoundStore } from "@/store";
import { customPresetColors, defectTypeColors } from "@/theme/color";
// import { useEngineDB } from '@engine-app/engine-db';

const useFetchDefectTypeList = () => {
  // const { engineDBApi } = useEngineDB();

  const setDefectTypeList = useBoundStore((state) => state.setDefectTypeList);
  // const selectedRevisionId = useBoundStore((state) => state.selectedRevisionId);

  const fetchDefectTypeList = async () => {
    // if (!engineDBApi || !selectedRevisionId) {
    //   return;
    // }
    // const response = await engineDBApi.getCollectionRevisionLabels({
    //   collectionRevisionId: selectedRevisionId,
    // });
    // const newDefectTypeList = response.labels.map((label, index) => {
    //   return {
    //     name: label,
    //     color: defectTypeColors[customPresetColors[index]],
    //     defectTypeNumber: index + 1,
    //   };
    // });
    // setDefectTypeList(newDefectTypeList);
  };

  return fetchDefectTypeList;
};

export default useFetchDefectTypeList;
