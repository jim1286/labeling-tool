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
import {
  useCanvasAction,
  useCanvasStyle,
  useMouseMode,
  useResizeImage,
} from "@/hooks";
import { useBoundStore } from "@/store";
import { CursorCoordinates, Reticle } from "@/components";

const KeyPointCanvas: React.FC = () => {
  const currentImage = useBoundStore((state) => state.currentImage);
  const imageSize = useBoundStore((state) => state.imageSize);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const imageColorFilter = useBoundStore((state) => state.imageColorFilter);
  const canvasRef = useRef<HTMLDivElement>(null);
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
  const canvasStyle = useCanvasStyle(canvasRef, imageSize);

  useResizeImage({
    type: "labelingTool",
    canvasRef: canvasRef,
    originImageSize: originImageSize,
  });
  useMouseMode();

  return (
    <Container onMouseMove={handleContainerMouseMove}>
      <ToolBarContainer>
        <ToolBar />
      </ToolBarContainer>
      <CanvasContainer
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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

export default KeyPointCanvas;
