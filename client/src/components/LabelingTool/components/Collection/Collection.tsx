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
import { useKeyDown } from "@/hooks";
import { useBoundStore } from "@/store";
import { collectionImageList } from "@/const";

const Collection: React.FC = () => {
  const currentImage = useBoundStore((state) => state.currentImage);
  const setCurrentImage = useBoundStore((state) => state.setCurrentImage);

  const handleClickCollectionImage = (imageId: number) => {
    const findImage = collectionImageList.find(
      (image) => image.imageId === imageId
    );

    if (findImage) {
      setCurrentImage({ ...findImage, data: null });
    }
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
            </CollectionItem>
          ))}
        </CollectionBody>
      </CollectionContainer>
    </Container>
  );
};

export default Collection;
