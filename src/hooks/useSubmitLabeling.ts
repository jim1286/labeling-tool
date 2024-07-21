import { LabelData, OdData } from "@/interface";
import { CoreUtil } from "@/utils";
import { DrawModeEnum, LabelingModeEnum } from "@/enums";
import { useBoundStore } from "@/store";
// import { LabelData, ModifyLabelDataParam } from "@engine-app/types";
// import { useEngineDB } from '@engine-app/engine-db';
import { notification } from "antd";
import { useState } from "react";
import { cloneDeep } from "lodash";
import {
  useResetLabeling,
  useSubmitSegmentation,
  useFetchClickedNpyRequest,
  useSleep,
  useSamEditData,
  useSubmitKeyPoint,
} from "@/hooks";

const useSubmitLabeling = () => {
  const resetLabeling = useResetLabeling();
  const convertKeyPointData = useSubmitKeyPoint();
  const convertSegmentData = useSubmitSegmentation();
  const setCurrentImage = useBoundStore((state) => state.setCurrentImage);
  const setDisableKeyInLabeling = useBoundStore(
    (state) => state.setDisableKeyInLabeling
  );
  const fetchClickedNpyRequest = useFetchClickedNpyRequest();
  const getSamEditData = useSamEditData();
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
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  // const { engineDBApi } = useEngineDB();

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

        await saveLabeling(odLabelData);
        break;
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

        await saveLabeling(segmentLabelData);
        break;
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

        await saveLabeling(keyPointLabelData);
        break;
      }
    }
  };

  const saveLabeling = async (labelData: LabelData) => {
    // if (!currentImage || !engineDBApi || !selectedRevisionId) {
    //   return;
    // }
    // try {
    //   const param: ModifyLabelDataParam = {
    //     imageId: currentImage.imageId,
    //     collectionRevisionId: selectedRevisionId,
    //     data: labelData,
    //   };
    //   await engineDBApi?.modifyLabelData(param);
    //   api.open({
    //     type: "success",
    //     message: `${currentImage.filename} 저장 완료`,
    //     placement: "bottomRight",
    //   });
    // } catch (error) {
    //   console.log(error);
    //   api.open({
    //     type: "error",
    //     message: `${currentImage.filename} 저장 실패`,
    //     placement: "bottomRight",
    //   });
    // } finally {
    //   setIsLoading(false);
    //   setDisableKeyInLabeling(false);
    // }
  };

  const fetchCollectionState = async () => {
    // if (!engineDBApi || !selectedRevisionId) {
    //   return;
    // }
    // const collectionImageList =
    //   await engineDBApi.getCollectionRevisionImageList({
    //     collectionRevisionId: selectedRevisionId,
    //   });
    // resetLabeling();
    // const currentImageIndex = collectionImageList.findIndex(
    //   (ele) => ele.imageId === currentImage.imageId
    // );
    // if (currentImageIndex === -1) {
    //   return;
    // }
    // const upList = collectionImageList.slice(0, currentImageIndex);
    // const downList = collectionImageList.slice(currentImageIndex + 1);
    // const nextNotLabelConfirmed = [...downList, ...upList].find(
    //   (ele) => !ele.isLabelConfirmed
    // );
    // const isLastImage = collectionImageList.length === currentImageIndex + 1;
    // const nextImageData = await engineDBApi.getImageWithLabelData({
    //   collectionRevisionId: selectedRevisionId,
    //   imageId: nextNotLabelConfirmed
    //     ? nextNotLabelConfirmed.imageId
    //     : isLastImage
    //     ? collectionImageList[currentImageIndex].imageId
    //     : collectionImageList[currentImageIndex + 1].imageId,
    // });
    // setCurrentImage({
    //   ...nextImageData,
    //   path: CoreUtil.wrapFileScheme(nextImageData.path),
    // });
    // if (labelingMode === LabelingModeEnum.SEGMENTATION) {
    //   await fetchClickedNpyRequest(nextImageData.imageId);
    // }
  };

  return { isLoading, contextHolder, handleSubmit, fetchCollectionState };
};

export default useSubmitLabeling;
