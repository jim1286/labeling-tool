import React from "react";
import {
  Container,
  CollectionHeader,
  CollectionBody,
  CollectionContainer,
  CollectionItem,
} from "./styles";
import { BS, LM } from "@/theme";
import { NumberUtil } from "@/utils";
import { useKeyDown, useResetLabeling, useSubmitLabeling } from "@/hooks";
import { useBoundStore } from "@/store";
import { Spin } from "antd";
import { LabelingModeEnum } from "@/enums";
import { IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import { useTheme } from "styled-components";

const Collection: React.FC = () => {
  const theme = useTheme();
  const autoSave = useBoundStore((state) => state.autoSave);
  const currentImage = useBoundStore((state) => state.currentImage);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const collectionImageList = useBoundStore(
    (state) => state.collectionImageList
  );
  const resetLabeling = useResetLabeling();
  const setCurrentImage = useBoundStore((state) => state.setCurrentImage);
  const { isLoading, contextHolder, handleSubmit } = useSubmitLabeling();
  const disableSubmit =
    labelingMode === LabelingModeEnum.CLASSIFICATION && !selectedDefectType;

  const handleClickCollectionImage = async (imageId: number) => {
    const findImage = collectionImageList.find(
      (image) => image.imageId === imageId
    );

    if (!findImage) {
      return;
    }

    if (autoSave && !disableSubmit) {
      await handleSubmit();
    }

    resetLabeling();
    setCurrentImage({ ...findImage });
  };

  useKeyDown(async () => {
    const currentImageIndex = collectionImageList.findIndex(
      (collectionImage) => collectionImage.imageId === currentImage.imageId
    );

    if (currentImageIndex === -1) {
      return;
    }

    if (currentImageIndex === 0) {
      handleClickCollectionImage(
        collectionImageList[collectionImageList.length - 1].imageId
      );
      return;
    }

    handleClickCollectionImage(
      collectionImageList[currentImageIndex - 1].imageId
    );
  }, ["KeyA"]);

  useKeyDown(() => {
    const currentImageIndex = collectionImageList.findIndex(
      (collectionImage) => collectionImage.imageId === currentImage.imageId
    );

    if (currentImageIndex === -1) {
      return;
    }

    if (collectionImageList.length - 1 === currentImageIndex) {
      handleClickCollectionImage(collectionImageList[0].imageId);
      return;
    }

    handleClickCollectionImage(
      collectionImageList[currentImageIndex + 1].imageId
    );
  }, ["KeyD"]);

  return (
    <Container>
      {contextHolder}
      <CollectionHeader>
        <LM>컬렉션</LM>
        <LM>{NumberUtil.numberWithCommas(collectionImageList.length)}</LM>
      </CollectionHeader>
      <CollectionContainer>
        <CollectionBody>
          {collectionImageList.map((collectionImage) => (
            <CollectionItem
              key={collectionImage.imageId}
              isSelected={currentImage.imageId === collectionImage.imageId}
              onClick={() => {
                handleClickCollectionImage(collectionImage.imageId);
              }}
            >
              <BS style={{ width: "80%" }}>{collectionImage.filename}</BS>
              {collectionImage.isLabelConfirmed ? (
                <IconCircleCheckFilled color={theme.icon.success} />
              ) : (
                <IconCircle color={theme.icon.tertiary} />
              )}
            </CollectionItem>
          ))}
        </CollectionBody>
      </CollectionContainer>
      {isLoading && <Spin fullscreen />}
    </Container>
  );
};

export default Collection;
