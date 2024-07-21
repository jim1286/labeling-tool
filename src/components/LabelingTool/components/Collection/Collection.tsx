import React from "react";
import {
  Container,
  CollectionHeader,
  CollectionBody,
  SmartLabeling,
  CollectionContainer,
} from "./styles";
import { BS, LM } from "@/theme";
import { useBoundStore } from "@/store";
import { NumberUtil } from "@/utils";
import { LazyImageComponent } from "./components";
import { Spin, Switch } from "antd";
import { TooltipWrap } from "@/components/TooltipWrap";
import useCollection from "./hook";
import { LabelingModeEnum } from "@/enums";

const Collection: React.FC = () => {
  const setAbleNpyRequest = useBoundStore((state) => state.setAbleNpyRequest);
  const npyRequests = useBoundStore((state) => state.npyRequests);
  const {
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
  } = useCollection();

  return (
    <Container>
      {contextHolder}
      <CollectionHeader>
        <LM>{`컬렉션 - ${NumberUtil.getFloatFixed(
          (labeledImageLength / collectionImageLength) * 100,
          2
        )}%`}</LM>
        <LM>{`${NumberUtil.numberWithCommas(
          labeledImageLength
        )} / ${NumberUtil.numberWithCommas(collectionImageLength)}`}</LM>
      </CollectionHeader>
      {labelingMode === LabelingModeEnum.SEGMENTATION && (
        <SmartLabeling>
          <TooltipWrap title="생성하기 ON/OFF(Ctrl+Tab)">
            <BS>스마트 라벨링 생성하기</BS>
          </TooltipWrap>
          <Switch
            value={ableNpyRequest}
            onChange={() => setAbleNpyRequest(!ableNpyRequest)}
          />
        </SmartLabeling>
      )}
      <CollectionContainer>
        <CollectionBody>
          {lazyLoadedCollectionImageList.map((collectionImage, index) => {
            const isSamLoading =
              ableNpyRequest &&
              npyRequests.find(
                (npyRequest) => collectionImage.path === npyRequest
              );
            const iconType = isSamLoading
              ? "spin"
              : collectionImage.isLabelConfirmed
              ? "labeled"
              : "unlabeled";

            return (
              <LazyImageComponent
                key={collectionImage.imageId}
                iconType={iconType}
                isSelected={currentImage.imageId === collectionImage.imageId}
                collectionImage={collectionImage}
                isLastElement={
                  index === lazyLoadedCollectionImageList.length - 1
                }
                lastElementRef={lastElementRef}
                handleClickImage={handleClickCollectionImage}
              />
            );
          })}
        </CollectionBody>
      </CollectionContainer>
      {isLoading && <Spin tip="저장 중..." size="large" fullscreen />}
    </Container>
  );
};

export default Collection;
