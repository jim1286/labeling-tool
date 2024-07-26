import {
  TaskLayer,
  OdData,
  CurrentImage,
  KeyPointData,
  TaskLayerData,
  DefectType,
  LabelData,
  BoxLabelData,
  KeyPointLabelData,
} from "@/interface";
import {
  CanvasDataType,
  DrawModeEnum,
  LabelingModeEnum,
  SamModeEnum,
} from "@/enums";
import { nanoid } from "nanoid";
import { useBoundStore } from "@/store";
import { DecodeUtil, EncodeUtil, ImageUtil, LabelingUtil } from "@/utils";
import { useEffect, useState } from "react";
import useSleep from "./useSleep";
import useSetNewTaskLayer from "./useSetNewTaskLayer";
import { usePostInitSamMutation } from "@/queries";

const useInitLabeling = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setSamMode = useBoundStore((state) => state.setSamMode);
  const setDrawMode = useBoundStore((state) => state.setDrawMode);
  const setTaskLayerList = useBoundStore((state) => state.setTaskLayerList);
  const setSelectedDefectType = useBoundStore(
    (state) => state.setSelectedDefectType
  );
  const setOriginImageSize = useBoundStore((state) => state.setOriginImageSize);
  const setNewTaskLayer = useSetNewTaskLayer();
  const currentImage = useBoundStore((state) => state.currentImage);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  const defaultDefectType = useBoundStore((state) => state.defaultDefectType);
  const { mutateAsync: initSamMutateAsync, isPending: initSamIsPending } =
    usePostInitSamMutation();

  useEffect(() => {
    if (!currentImage.path) {
      return;
    }

    initLabeling(currentImage);
  }, [currentImage.path, currentImage.data]);

  const initLabeling = async (currentImage: CurrentImage) => {
    const labelData = currentImage.data;

    if (labelData) {
      const isHeavyLoad =
        labelData.imageWidth *
          labelData.imageHeight *
          labelData.annotations.length >
        5000000;

      if (isHeavyLoad) {
        setIsLoading(true);
      }
    }

    await useSleep(50);
    await initImageSize(currentImage);

    if (labelingMode === LabelingModeEnum.SEGMENTATION) {
      await initSamMutateAsync({ fileName: currentImage.filename });
    }

    if (defaultDefectType && !labelData) {
      await initDrawMode(defaultDefectType);
    }

    if (labelData) {
      initData(labelData);
    }

    setIsLoading(false);
  };

  const initImageSize = async (currentImage: CurrentImage) => {
    try {
      const imageSize = await ImageUtil.getImageDimensions(currentImage.path);
      setOriginImageSize(imageSize);
    } catch (error) {
      console.log(error);
    }
  };

  const initDrawMode = async (defaultDefectType: DefectType) => {
    setSelectedDefectType(defaultDefectType);

    switch (labelingMode) {
      case LabelingModeEnum.OBJECT_DETECTION: {
        setDrawMode(DrawModeEnum.BOX);
        break;
      }
      case LabelingModeEnum.KEY_POINT: {
        setDrawMode(DrawModeEnum.KEY_POINT);
        setNewTaskLayer([], defaultDefectType);
        break;
      }
      case LabelingModeEnum.SEGMENTATION: {
        setDrawMode(DrawModeEnum.SAM);
        setSamMode(SamModeEnum.POINT);
        setNewTaskLayer([], defaultDefectType);
        break;
      }
    }
  };

  const initData = (labelData: LabelData) => {
    switch (labelingMode) {
      case LabelingModeEnum.CLASSIFICATION: {
        const clsDefectType = getClsDefectType(labelData);

        if (!clsDefectType) {
          return;
        }

        setSelectedDefectType(clsDefectType);
        break;
      }
      case LabelingModeEnum.OBJECT_DETECTION: {
        setTaskLayerList(getOdTaskLayer(labelData));
        break;
      }
      case LabelingModeEnum.SEGMENTATION: {
        setTaskLayerList(getSegTaskLayer(labelData));
        break;
      }
      case LabelingModeEnum.KEY_POINT: {
        setTaskLayerList(getKeyPointTaskLayer(labelData));
        break;
      }
      default:
        return null;
    }
  };

  const getClsDefectType = (labelData: LabelData) => {
    const defectType = defectTypeList.find(
      (item) => item.name === labelData.imageClass
    );

    if (!defectType) {
      return;
    }

    return defectType;
  };

  const getOdTaskLayer = (labelData: LabelData) => {
    const newTaskLayerList: TaskLayer[] = [];

    labelData.annotations.forEach((annotation, index) => {
      const defectType = defectTypeList.find(
        (item) => item.name === annotation.label
      );

      if (!defectType) {
        return;
      }

      const boxLabelData = annotation.data as BoxLabelData;
      const odData: OdData = {
        id: nanoid(),
        index: index,
        rectangleData: {
          x: boxLabelData[0][0],
          y: boxLabelData[0][1],
          width: boxLabelData[1][0] - boxLabelData[0][0],
          height: boxLabelData[1][1] - boxLabelData[0][1],
        },
        coordinates: boxLabelData,
      };

      newTaskLayerList.push({
        id: nanoid(),
        defectType: defectType,
        data: [
          {
            data: odData,
            type: CanvasDataType.BOX,
          },
        ],
        hidden: false,
      });
    });

    return newTaskLayerList;
  };

  const getSegTaskLayer = (labelData: LabelData) => {
    const decodedMaskData: number[] = Array(
      labelData.imageHeight * labelData.imageWidth
    ).fill(0);

    DecodeUtil.decodeMaskData(decodedMaskData, JSON.parse(labelData.mask));

    const newTaskLayerList: TaskLayer[] = [];

    labelData.annotations.forEach((annotation) => {
      const defectType = defectTypeList.find(
        (defectType) => defectType.name === annotation.label
      );

      if (!defectType) {
        return;
      }

      const newTaskLayer = LabelingUtil.getNewTaskLayer(defectType);
      const newMaskData: number[] = decodedMaskData.map((ele) => {
        if (ele === annotation.data) {
          return ele;
        }

        return 0;
      });

      const newEncodedData = EncodeUtil.encode(newMaskData);
      const newTaskLayerData = {
        type: CanvasDataType.ENCODED,
        data: JSON.stringify(newEncodedData),
      };

      newTaskLayer.data.push(newTaskLayerData);
      newTaskLayerList.push(newTaskLayer);
    });

    return newTaskLayerList;
  };

  const getKeyPointTaskLayer = (labelData: LabelData) => {
    const newTaskLayerList: TaskLayer[] = [];

    labelData.annotations.forEach((annotation) => {
      const defectType = defectTypeList.find(
        (item) => item.name === annotation.label
      );

      if (!defectType) {
        return;
      }

      const newTaskLayer = LabelingUtil.getNewTaskLayer(defectType);
      const newKeyPointData: KeyPointData[] = (
        annotation.data as KeyPointLabelData
      ).map((data) => {
        return { id: nanoid(), coordinates: data };
      });

      const newTaskLayerData: TaskLayerData[] = newKeyPointData.map((ele) => {
        return {
          type: CanvasDataType.KEY_POINT,
          data: ele,
        };
      });

      newTaskLayer.data = newTaskLayerData;
      newTaskLayerList.push(newTaskLayer);
    });

    return newTaskLayerList;
  };

  return {
    isLoading: isLoading || initSamIsPending,
    initLabeling,
    getClsDefectType,
    getOdTaskLayer,
    getSegTaskLayer,
    getKeyPointTaskLayer,
  };
};

export default useInitLabeling;
