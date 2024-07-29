import React, { useRef } from "react";
import {
  CanvasImage,
  CanvasContainer,
  ImageContainer,
  PainterContainer,
  Container,
  BrushCursor,
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
import { BrushModeEnum, DrawModeEnum, MouseModeEnum } from "@/enums";
import { IconPlus } from "@tabler/icons-react";
import { LabelingUtil } from "@/utils";

const SegmentCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const drawMode = useBoundStore((state) => state.drawMode);
  const brushMode = useBoundStore((state) => state.brushMode);
  const mouseMode = useBoundStore((state) => state.mouseMode);
  const brushSize = useBoundStore((state) => state.brushSize);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const imageSize = useBoundStore((state) => state.imageSize);
  const currentImage = useBoundStore((state) => state.currentImage);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const imageColorFilter = useBoundStore((state) => state.imageColorFilter);
  const {
    scale,
    point,
    isDragging,
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
  const isBrushMode =
    !!selectedDefectType &&
    drawMode === DrawModeEnum.BRUSH &&
    mouseMode === MouseModeEnum.DRAW;

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
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <Painter />
          {isBrushMode && (
            <BrushCursor
              point={point}
              size={brushSize}
              brushColor={
                brushMode === BrushModeEnum.ERASE
                  ? "white"
                  : selectedDefectType?.color || "black"
              }
              rgb={
                brushMode === BrushModeEnum.ERASE
                  ? [255, 255, 255]
                  : LabelingUtil.convertHexToRgb(selectedDefectType?.color)
              }
            >
              <IconPlus
                color={
                  brushMode === BrushModeEnum.ERASE
                    ? "white"
                    : selectedDefectType?.color || "black"
                }
              />
            </BrushCursor>
          )}
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

export default SegmentCanvas;
