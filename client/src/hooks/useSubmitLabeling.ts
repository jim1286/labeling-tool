import { LabelData, OdData } from "@/interface";
import { DrawModeEnum, LabelingModeEnum } from "@/enums";
import { useBoundStore } from "@/store";
import { notification } from "antd";
import { useState } from "react";
import { cloneDeep } from "lodash";
import {
  useSubmitSegmentation,
  useSleep,
  useSamEditData,
  useSubmitKeyPoint,
  useResetLabeling,
} from "@/hooks";

const useSubmitLabeling = () => {
  const convertKeyPointData = useSubmitKeyPoint();
  const convertSegmentData = useSubmitSegmentation();
  const setDisableKeyInLabeling = useBoundStore(
    (state) => state.setDisableKeyInLabeling
  );
  const setCollectionImageList = useBoundStore(
    (state) => state.setCollectionImageList
  );
  const setCurrentImage = useBoundStore((state) => state.setCurrentImage);
  const getSamEditData = useSamEditData();
  const resetLabeling = useResetLabeling();
  const drawMode = useBoundStore((state) => state.drawMode);
  const editDataList = useBoundStore((state) => state.editDataList);
  const taskLayerList = useBoundStore((state) => state.taskLayerList);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const currentImage = useBoundStore((state) => state.currentImage);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const selectedTaskLayerId = useBoundStore(
    (state) => state.selectedTaskLayerId
  );
  const collectionImageList = useBoundStore(
    (state) => state.collectionImageList
  );
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const imageSize = {
    imageHeight: originImageSize.height,
    imageWidth: originImageSize.width,
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setDisableKeyInLabeling(true);

    await useSleep(50);

    switch (labelingMode) {
      case LabelingModeEnum.CLASSIFICATION: {
        if (!selectedDefectType) {
          return;
        }

        const clsLabelData: LabelData = {
          ...imageSize,
          imageClass: selectedDefectType.name,
          annotations: [],
          mask: JSON.stringify([]),
        };

        await saveLabeling(clsLabelData);
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        const labelingList = taskLayerList.map(
          (taskLayer) => (taskLayer.data[0].data as OdData).coordinates
        );

        const odLabelData: LabelData = {
          ...imageSize,
          imageClass: "",
          mask: JSON.stringify([]),
          annotations: taskLayerList.map((taskLayer, index) => {
            return {
              type: "box",
              label: taskLayer.defectType.name,
              bbox: labelingList[index].flat(),
              data: labelingList[index],
            };
          }),
        };

        return await saveLabeling(odLabelData);
      }
      case LabelingModeEnum.SEGMENTATION: {
        const savedTaskLayerList = cloneDeep(taskLayerList);
        const selectedTaskLayer = savedTaskLayerList.find(
          (taskLayer) => taskLayer.id === selectedTaskLayerId
        );

        if (selectedTaskLayer && editDataList.length !== 0) {
          switch (drawMode) {
            case DrawModeEnum.BRUSH: {
              selectedTaskLayer.data.push(...editDataList);
              break;
            }
            case DrawModeEnum.SAM: {
              const newEditData = await getSamEditData();

              if (!newEditData) {
                break;
              }

              selectedTaskLayer.data = [newEditData];
              break;
            }
          }
        }

        const { bboxList, uniqueArray, encodedMergedMaskData } =
          convertSegmentData(savedTaskLayerList);

        const segmentLabelData: LabelData = {
          ...imageSize,
          imageClass: "",
          mask: JSON.stringify(encodedMergedMaskData),
          annotations: savedTaskLayerList
            .filter((taskLayer) => taskLayer.data.length !== 0)
            .filter((_, index) => uniqueArray.includes(index + 1))
            .map((taskLayer, index) => {
              return {
                type: "seg",
                label: taskLayer.defectType.name,
                bbox: bboxList[index],
                data: uniqueArray[index + 1],
              };
            }),
        };

        return await saveLabeling(segmentLabelData);
      }
      case LabelingModeEnum.KEY_POINT: {
        const savedTaskLayerList = cloneDeep(taskLayerList);
        const selectedTaskLayer = savedTaskLayerList.find(
          (taskLayer) => taskLayer.id === selectedTaskLayerId
        );

        if (selectedTaskLayer && editDataList.length !== 0) {
          selectedTaskLayer.data.push(...editDataList);
        }

        const { bboxList, keyPointDataList } =
          convertKeyPointData(savedTaskLayerList);

        const keyPointLabelData: LabelData = {
          ...imageSize,
          imageClass: "",
          mask: JSON.stringify([]),
          annotations: savedTaskLayerList
            .filter((taskLayer) => taskLayer.data.length !== 0)
            .map((taskLayer, index) => {
              return {
                type: "keypoint",
                label: taskLayer.defectType.name,
                bbox: bboxList[index],
                data: keyPointDataList[index],
              };
            }),
        };

        return await saveLabeling(keyPointLabelData);
      }
    }
  };

  const saveLabeling = async (labelData: LabelData) => {
    try {
      const findImageIndex = collectionImageList.findIndex(
        (image) => image.imageId === currentImage.imageId
      );

      if (findImageIndex === -1) {
        return;
      }

      const saveCollectionImageList = cloneDeep(collectionImageList);
      saveCollectionImageList[findImageIndex].data = labelData;
      saveCollectionImageList[findImageIndex].isLabelConfirmed = true;
      setCollectionImageList(saveCollectionImageList);

      api.open({
        type: "success",
        message: `${currentImage.filename} 저장 성공`,
        placement: "bottomRight",
      });
    } catch (error) {
      console.log(error);
      api.open({
        type: "error",
        message: `${currentImage.filename} 저장 실패`,
        placement: "bottomRight",
      });
    } finally {
      setIsLoading(false);
      setDisableKeyInLabeling(false);
    }
  };

  const fetchCollectionState = () => {
    const findImageIndex = collectionImageList.findIndex(
      (image) => image.imageId === currentImage.imageId
    );

    if (findImageIndex === -1) {
      return;
    }

    resetLabeling();

    if (collectionImageList.length - 1 === findImageIndex) {
      setCurrentImage({ ...collectionImageList[0] });
      return;
    }

    setCurrentImage({ ...collectionImageList[findImageIndex + 1] });
  };

  return { isLoading, contextHolder, handleSubmit, fetchCollectionState };
};

export default useSubmitLabeling;
