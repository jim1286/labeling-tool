import React, { useEffect } from "react";
import useAdjustment from "./hook";
import { AdjustmentModalProps, UseAdjustmentProps } from "./interface";
import {
  AdjustmentFilter,
  AdjustmentModalBody,
  AdjustmentModalContainer,
  AdjustmentModalFooter,
  AdjustmentModalHeader,
  AdjustmentModalTitle,
  AdjustmentModalWrap,
  AdjustmentSection,
  Button,
  CanvasImage,
  CanvasImageWrap,
  FilterName,
  FilterRange,
  FilterRangeInput,
  ResetButton,
} from "./styles";
import { IconPalette } from "@tabler/icons-react";
import { useBoundStore } from "@/store";
import { useTheme } from "styled-components";

const AdjustmentModal: React.FC<AdjustmentModalProps> = ({
  open,
  onSubmit,
}) => {
  const theme = useTheme();
  const currentImage = useBoundStore((state) => state.currentImage);
  const imageColorFilter = useBoundStore((state) => state.imageColorFilter);
  const useAdjustmentProps: UseAdjustmentProps = {
    open: open,
    imageColorFilter: imageColorFilter,
  };
  const model = useAdjustment(useAdjustmentProps);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSubmit({
        contrast: model.contrast,
        saturate: model.saturation,
        brightness: model.brightness,
      });
    }

    if (e.code === "Escape") {
      onSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <AdjustmentModalContainer>
      <AdjustmentModalWrap>
        <AdjustmentModalHeader>
          <IconPalette color={theme.icon.primary} />
          <AdjustmentModalTitle>조정</AdjustmentModalTitle>
        </AdjustmentModalHeader>
        <AdjustmentModalBody>
          <CanvasImageWrap>
            <CanvasImage
              brightness={model.brightness}
              contrast={model.contrast}
              saturate={model.saturation}
              src={currentImage.path}
            />
          </CanvasImageWrap>

          <ResetButton onClick={model.reset}>Reset</ResetButton>
          <AdjustmentSection>
            <AdjustmentFilter>
              <FilterName>Exposure</FilterName>
              <FilterRange
                type="range"
                min="0"
                max="100"
                backSize={model.brightness}
                value={model.brightness}
                onChange={model.onChangeExposure}
                step="1"
              />
              <FilterRangeInput
                value={model.brightness}
                onChange={model.onChangeExposure}
                type="text"
              />
            </AdjustmentFilter>
            <AdjustmentFilter>
              <FilterName>Contrast</FilterName>
              <FilterRange
                type="range"
                min="0"
                max="100"
                backSize={model.contrast}
                value={model.contrast}
                onChange={model.onChangeContrast}
                step="1"
              />
              <FilterRangeInput
                value={model.contrast}
                onChange={model.onChangeContrast}
                type="text"
              />
            </AdjustmentFilter>
            <AdjustmentFilter>
              <FilterName>Saturation</FilterName>
              <FilterRange
                type="range"
                min="0"
                max="100"
                backSize={model.saturation}
                value={model.saturation}
                onChange={model.onChangeSaturation}
                step="1"
              />
              <FilterRangeInput
                value={model.saturation}
                onChange={model.onChangeSaturation}
                type="text"
              />
            </AdjustmentFilter>
          </AdjustmentSection>
        </AdjustmentModalBody>
        <AdjustmentModalFooter>
          <Button onClick={() => onSubmit()} color="default">
            No
          </Button>
          <Button
            onClick={() =>
              onSubmit({
                contrast: model.contrast,
                saturate: model.saturation,
                brightness: model.brightness,
              })
            }
            color="primary"
          >
            Yes
          </Button>
        </AdjustmentModalFooter>
      </AdjustmentModalWrap>
    </AdjustmentModalContainer>
  );
};

export default AdjustmentModal;
