import { TaskLayer, ImageSize, DefectType } from "@/interface";
import { LabelingModeEnum } from "@/enums";
import { LabelDataItem } from "@engine-app/types";
import { useEffect, useState } from "react";
import { useInitLabeling, useSleep } from ".";

const useInitViewer = (
  viewerType: LabelingModeEnum,
  viewerData: LabelDataItem
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [defectType, setDefectType] = useState<DefectType | undefined>(
    undefined
  );
  const [taskLayerList, setTaskLayerList] = useState<TaskLayer[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });
  const {
    getClsDefectType,
    getOdTaskLayer,
    getSegTaskLayer,
    getKeyPointTaskLayer,
  } = useInitLabeling();

  useEffect(() => {
    const initViewer = async () => {
      const isHeavyLoad =
        viewerData.imageWidth *
          viewerData.imageHeight *
          viewerData.annotations.length >
        5000000;

      if (isHeavyLoad && viewerType === LabelingModeEnum.SEGMENTATION) {
        setIsLoading(true);
        await useSleep(50);
      }

      setImageSize({
        width: viewerData.imageWidth,
        height: viewerData.imageHeight,
      });
      initData(viewerData);

      setIsLoading(false);
    };

    if (viewerData) {
      initViewer();
    }
  }, [viewerData]);

  const initData = (imageData: LabelDataItem) => {
    switch (viewerType) {
      case LabelingModeEnum.CLASSIFICATION: {
        setDefectType(getClsDefectType(imageData));
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        setTaskLayerList(getOdTaskLayer(imageData));
        break;
      }
      case LabelingModeEnum.SEGMENTATION: {
        setTaskLayerList(getSegTaskLayer(imageData));
        break;
      }
      case LabelingModeEnum.KEY_POINT: {
        setTaskLayerList(getKeyPointTaskLayer(imageData));
        break;
      }
      default:
        return null;
    }
  };

  return { isLoading, imageSize, taskLayerList, defectType };
};

export default useInitViewer;
