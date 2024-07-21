import { LabelingModeEnum } from "@/enums";
import {
  useFetchClickedNpyRequest,
  useCurrentImageIsSamLoading,
  useResetLabeling,
  useSubmitLabeling,
  useKeyDown,
} from "@/hooks";
import { CollectionImage } from "@/interface";
import { useBoundStore } from "@/store";
import { CoreUtil } from "@/utils";
// import { useEngineDB } from '@engine-app/engine-db';
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;

const useCollection = () => {
  const setNpyRequests = useBoundStore((state) => state.setNpyRequests);
  const setCurrentImage = useBoundStore((state) => state.setCurrentImage);
  const setAbleNpyRequest = useBoundStore((state) => state.setAbleNpyRequest);
  const fetchClickedNpyRequest = useFetchClickedNpyRequest();
  const autoSave = useBoundStore((state) => state.autoSave);
  const ableNpyRequest = useBoundStore((state) => state.ableNpyRequest);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const currentImage = useBoundStore((state) => state.currentImage);
  // const selectedRevisionId = useBoundStore((state) => state.selectedRevisionId);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const observer = useRef<IntersectionObserver | null>(null);
  const resetLabeling = useResetLabeling();
  const [page, setPage] = useState(1);
  const [collectionImageLength, setCollectionImageLength] = useState(0);
  const [labeledImageLength, setLabeledImageLength] = useState(0);
  const [lazyLoadedCollectionImageList, setLazyLoadedCollectionImageList] =
    useState<CollectionImage[]>([]);
  // const { engineDBApi } = useEngineDB();

  const { isLoading, contextHolder, handleSubmit } = useSubmitLabeling();
  const disableSubmit =
    (labelingMode === LabelingModeEnum.CLASSIFICATION && !selectedDefectType) ||
    (labelingMode === LabelingModeEnum.SEGMENTATION &&
      useCurrentImageIsSamLoading());

  // collectionImageList 저장 여부 갱신 용도
  useEffect(() => {
    const fetchCollectionImageList = async () => {
      // if (!engineDBApi || !selectedRevisionId) {
      //   return;
      // }
      // const collectionImageList = await getCollectionImageList();
      // const fetchLabeledLength = collectionImageList.filter(
      //   (collectionImage) => collectionImage.isLabelConfirmed
      // ).length;
      // setLabeledImageLength(fetchLabeledLength);
      // setLazyLoadedCollectionImageList(
      //   collectionImageList.slice(0, lazyLoadedCollectionImageList.length)
      // );
    };

    if (lazyLoadedCollectionImageList.length) {
      fetchCollectionImageList();
    }
  }, [currentImage, lazyLoadedCollectionImageList.length]);

  useEffect(() => {
    fetchCollectionState();
  }, []);

  const getCollectionImageList = async () => {
    // if (!engineDBApi || !selectedRevisionId) {
    //   return [];
    // }
    // return await engineDBApi.getCollectionRevisionImageList({
    //   collectionRevisionId: selectedRevisionId,
    // });
  };

  const lastElementRef = useCallback(
    async (lastElement: HTMLElement | null) => {
      if (lazyLoadedCollectionImageList.length === collectionImageLength) {
        if (observer.current) {
          observer.current.disconnect();
        }

        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreImages();
        }
      });

      if (lastElement) {
        observer.current.observe(lastElement);
      }
    },
    [page, lazyLoadedCollectionImageList]
  );

  const loadMoreImages = async () => {
    const collectionImageList = await getCollectionImageList();

    setPage((prevPage) => prevPage + 1);
    // setLazyLoadedCollectionImageList(
    //   collectionImageList.slice(0, (page + 1) * PAGE_SIZE)
    // );
  };

  const fetchCollectionState = async () => {
    //   if (!engineDBApi || !selectedRevisionId) {
    //     return;
    //   }
    //   try {
    //     const collectionImageList = await getCollectionImageList();
    //     const currentImage = collectionImageList.find(
    //       (ele) => !ele.isLabelConfirmed
    //     );
    //     const currentImageData = await engineDBApi?.getImageWithLabelData({
    //       collectionRevisionId: selectedRevisionId,
    //       imageId: currentImage
    //         ? currentImage.imageId
    //         : collectionImageList[0].imageId,
    //     });
    //     setCollectionImageLength(collectionImageList.length);
    //     setLazyLoadedCollectionImageList(collectionImageList.slice(0, PAGE_SIZE));
    //     setCurrentImage({
    //       ...currentImageData,
    //       path: CoreUtil.wrapFileScheme(currentImageData.path),
    //     });
    //     if (labelingMode === LabelingModeEnum.SEGMENTATION) {
    //       await fetchNpyRequests();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // const fetchNpyRequests = async () => {
    //   const collectionImageList = await getCollectionImageList();
    //   const newNpyRequests: string[] = [];
    //   const batchSize = 100;
    //   for (let i = 0; i < collectionImageList.length; i += batchSize) {
    //     const batch = collectionImageList.slice(i, i + batchSize);
    //     const npys = await Promise.all(
    //       batch.map(async (task) => await engineDBApi?.getNpy(task.path))
    //     );
    //     npys.forEach(
    //       (npy, index) =>
    //         npy || newNpyRequests.push(collectionImageList[i + index].path)
    //     );
    //   }
    //   setNpyRequests(newNpyRequests);
  };

  const handleClickCollectionImage = async (imageId: number) => {
    try {
      await fetchClickedImage(imageId);

      if (labelingMode === LabelingModeEnum.SEGMENTATION) {
        await fetchClickedNpyRequest(imageId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClickedImage = async (imageId: number) => {
    // if (
    //   !engineDBApi ||
    //   currentImage.imageId === imageId ||
    //   !selectedRevisionId
    // ) {
    //   return;
    // }
    // if (autoSave && !disableSubmit) {
    //   await handleSubmit();
    // }
    // resetLabeling();
    // try {
    //   const currentImageData = await engineDBApi.getImageWithLabelData({
    //     collectionRevisionId: selectedRevisionId,
    //     imageId,
    //   });
    //   setCurrentImage({
    //     ...currentImageData,
    //     path: CoreUtil.wrapFileScheme(currentImageData.path),
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useKeyDown(
    (e) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        labelingMode === LabelingModeEnum.SEGMENTATION
      ) {
        setAbleNpyRequest(!ableNpyRequest);
      }
    },
    ["Tab"]
  );

  useKeyDown(async () => {
    // const collectionImageList = await getCollectionImageList();
    // const currentImageIndex = collectionImageList.findIndex(
    //   (collectionImage) => collectionImage.imageId === currentImage.imageId
    // );
    // if (currentImageIndex === 0 || currentImageIndex === -1) {
    //   return;
    // }
    // await fetchClickedImage(collectionImageList[currentImageIndex - 1].imageId);
  }, ["KeyA"]);

  useKeyDown(async () => {
    // const collectionImageList = await getCollectionImageList();
    // const currentImageIndex = collectionImageList.findIndex(
    //   (collectionImage) => collectionImage.imageId === currentImage.imageId
    // );
    // if (
    //   collectionImageList.length - 1 === currentImageIndex ||
    //   currentImageIndex === -1
    // ) {
    //   return;
    // }
    // await fetchClickedImage(collectionImageList[currentImageIndex + 1].imageId);
  }, ["KeyD"]);

  return {
    isLoading,
    contextHolder,
    ableNpyRequest,
    currentImage,
    labelingMode,
    labeledImageLength,
    collectionImageLength,
    lazyLoadedCollectionImageList,
    lastElementRef,
    handleClickCollectionImage,
  };
};

export default useCollection;
