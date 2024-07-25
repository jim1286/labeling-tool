import React from 'react';
import { BrushSizeContainer, Container, SizeWrap } from './styles';
import { useBrushTool } from './hook';
import {
  Divider,
  ToolBarIcon,
  Spacer,
  ESCButton,
  SaveButton,
  TooltipWrap,
} from '@/components';
import { BrushModeEnum } from '@/enums';
import { InputNumber } from 'antd';
import { useBoundStore } from '@/store';
import { useKeyDown } from '@/hooks';

const BrushMode: React.FC = () => {
  const isDrawing = useBoundStore((state) => state.isDrawing);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);
  const setBrushSize = useBoundStore((state) => state.setBrushSize);
  const {
    brushSize,
    brushMode,
    handlePainterDecrease,
    handlePainterIncrease,
    handleBrush,
    handleEraser,
    handleSave,
    handleESC,
  } = useBrushTool();

  useKeyDown(() => {
    handlePainterDecrease();
  }, ['BracketLeft']);

  useKeyDown(() => {
    handlePainterIncrease();
  }, ['BracketRight']);

  useKeyDown(() => {
    if (isDrawing) {
      return;
    }

    handleBrush();
  }, ['KeyQ']);

  useKeyDown(() => {
    if (isDrawing) {
      return;
    }

    handleEraser();
  }, ['KeyW']);

  useKeyDown(() => {
    if (isDrawing) {
      return;
    }

    handleSave();
  }, ['Space']);

  useKeyDown(() => {
    handleESC();
  }, ['Escape']);

  return (
    <Container>
      <TooltipWrap title="브러시(Q)">
        <ToolBarIcon
          iconType="brush"
          onClick={handleBrush}
          iconColor={selectedDefectType?.color}
          isClicked={BrushModeEnum.PAINT === brushMode}
        />
      </TooltipWrap>
      <TooltipWrap title="지우개(W)">
        <ToolBarIcon
          iconType="eraser"
          onClick={handleEraser}
          isClicked={BrushModeEnum.ERASE === brushMode}
        />
      </TooltipWrap>
      <Divider />
      <BrushSizeContainer>
        <TooltipWrap title="크기 축소( [ )">
          <ToolBarIcon
            iconType="minus"
            onClick={handlePainterDecrease}
            style={{ width: '20px', height: '20px' }}
          />
        </TooltipWrap>
        <SizeWrap width={brushSize >= 100 ? 47 : 40}>
          <InputNumber
            size="middle"
            controls={false}
            variant="borderless"
            value={brushSize}
            min={10}
            max={150}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setBrushSize(value);
            }}
          />
        </SizeWrap>
        <TooltipWrap title="크기 확대( ] )">
          <ToolBarIcon
            iconType="plus"
            onClick={handlePainterIncrease}
            style={{ width: '20px', height: '20px' }}
          />
        </TooltipWrap>
      </BrushSizeContainer>
      <Divider />
      <ESCButton onESC={handleESC} />
      <Spacer size={12} type="vertical" />
      <SaveButton onSave={handleSave} />
    </Container>
  );
};

export default BrushMode;
