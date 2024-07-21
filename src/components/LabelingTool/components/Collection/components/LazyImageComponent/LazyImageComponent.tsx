import React from "react";
import { BS } from "@/theme";
import { IconCircleCheckFilled, IconCircle } from "@tabler/icons-react";
import { Spin } from "antd";
import { CollectionItem } from "./styles";
import { CollectionImage } from "@/interface";
import { useTheme } from "styled-components";

interface Props {
  iconType: "spin" | "labeled" | "unlabeled";
  collectionImage: CollectionImage;
  isLastElement: boolean;
  isSelected: boolean;
  lastElementRef: (node: HTMLElement | null) => void;
  handleClickImage: (imageId: number) => void;
}

const LazyImageComponent: React.FC<Props> = ({
  iconType,
  collectionImage,
  isLastElement,
  isSelected,
  lastElementRef,
  handleClickImage,
}) => {
  const theme = useTheme();

  return (
    <CollectionItem
      ref={isLastElement ? lastElementRef : undefined}
      key={collectionImage.imageId}
      isSelected={isSelected}
      onClick={() => {
        handleClickImage(collectionImage.imageId);
      }}
    >
      <BS style={{ width: "80%" }}>{collectionImage.filename}</BS>
      {(() => {
        switch (iconType) {
          case "spin": {
            return <Spin />;
          }
          case "labeled": {
            return <IconCircleCheckFilled color={theme.icon.success} />;
          }
          case "unlabeled": {
            return <IconCircle color={theme.icon.tertiary} />;
          }
        }
      })()}
    </CollectionItem>
  );
};

export default LazyImageComponent;
