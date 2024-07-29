import React, { useRef } from "react";
import {
  CanvasImage,
  CanvasContainer,
  ImageContainer,
  Container,
  ToolBarContainer,
} from "./styles";
import { useCanvasStyle, useResizeImage } from "@/hooks";
import { ToolBar } from "./components";
import { useBoundStore } from "@/store";

const ClsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const currentImage = useBoundStore((state) => state.currentImage);
  const imageSize = useBoundStore((state) => state.imageSize);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const imageColorFilter = useBoundStore((state) => state.imageColorFilter);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const bordered = (() => {
    if (!currentImage) {
      return undefined;
    }

    if (!selectedDefectType) {
      return undefined;
    }

    return selectedDefectType.color;
  })();
  const canvasStyle = useCanvasStyle(canvasRef, imageSize, bordered);

  useResizeImage({
    type: "labelingTool",
    canvasRef: canvasRef,
    originImageSize: originImageSize,
    bordered: bordered,
  });

  return (
    <Container>
      <ToolBarContainer>
        <ToolBar />
      </ToolBarContainer>
      <CanvasContainer style={canvasStyle} ref={canvasRef} bordered={bordered}>
        <ImageContainer width={imageSize.width} height={imageSize.height}>
          <CanvasImage
            src={currentImage.path}
            saturate={imageColorFilter.saturate}
            brightness={imageColorFilter.brightness}
            contrast={imageColorFilter.contrast}
          />
        </ImageContainer>
      </CanvasContainer>
    </Container>
  );
};

export default ClsCanvas;
