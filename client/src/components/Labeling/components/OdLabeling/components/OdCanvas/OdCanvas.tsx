import React, { useRef } from "react";
import {
  CanvasImage,
  CanvasContainer,
  ImageContainer,
  PainterContainer,
  Container,
  ToolBarContainer,
} from "./styles";
import { Painter, ToolBar } from "./components";
import { useCursorStyle } from "./hook";
import { useCanvasAction, useCanvasStyle, useResizeImage } from "@/hooks";
import { useBoundStore } from "@/store";
import { CursorCoordinates, Reticle } from "@/components";

const OdCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageSize = useBoundStore((state) => state.imageSize);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const imageColorFilter = useBoundStore((state) => state.imageColorFilter);
  const currentImage = useBoundStore((state) => state.currentImage);
  const getCanvasStyle = useCanvasStyle();
  const {
    scale,
    isDragging,
    point,
    crosshairX,
    crosshairY,
    canvasEnter,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    handleContextMenu,
    handleCanvasMouseMove,
    handleContainerMouseMove,
  } = useCanvasAction(canvasRef);
  const cursorStyle = useCursorStyle(isDragging);
  const canvasStyle = getCanvasStyle(canvasRef, imageSize);

  useResizeImage({
    type: "labelingTool",
    canvasRef: canvasRef,
    originImageSize: originImageSize,
    scale: undefined,
    initialScale: undefined,
  });

  return (
    <Container onMouseMove={handleContainerMouseMove}>
      <ToolBarContainer>
        <ToolBar />
      </ToolBarContainer>
      <CanvasContainer
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        style={canvasStyle}
      >
        <ImageContainer width={imageSize.width} height={imageSize.height}>
          <CanvasImage
            src={currentImage.path}
            saturate={imageColorFilter.saturate}
            brightness={imageColorFilter.brightness}
            contrast={imageColorFilter.contrast}
          />
        </ImageContainer>

        <PainterContainer
          style={cursorStyle}
          width={imageSize.width}
          height={imageSize.height}
          onWheel={(event) => handleWheel(event, point)}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <Painter onCanvasMouseMove={handleCanvasMouseMove} />
        </PainterContainer>
        <Reticle
          canvasEnter={canvasEnter}
          crosshairX={crosshairX}
          crosshairY={crosshairY}
        />
      </CanvasContainer>

      {point.x >= 0 && point.y >= 0 && scale > 0 && (
        <CursorCoordinates point={point} scale={scale} />
      )}
    </Container>
  );
};

export default OdCanvas;
