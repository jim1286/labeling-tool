import React from 'react';
import { Container, LineWidthContainer, SizeWrap } from './styles';
import { AdjustmentModal, Divider, ToolBarIcon, TooltipWrap } from '@/components';
import { InputNumber } from 'antd';
import { useBoundStore } from '@/store';
import { LabelingModeEnum } from '@/enums';
import useToolAction from './hook';

const ToolComponent: React.FC = () => {
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const {
    lineWidth,
    enableReticle,
    openAdjustmentModal,
    handleUndo,
    handleRedo,
    setLineWidth,
    handleLineWidthDecrease,
    handleLineWidthIncrease,
    handleImageColorFilterSubmit,
    handleOpenAdjustmentModal,
    handleReticle,
  } = useToolAction();

  return (
    <Container>
      {labelingMode === LabelingModeEnum.KEY_POINT && (
        <>
          <LineWidthContainer>
            <TooltipWrap title="크기 축소( [ )">
              <ToolBarIcon
                iconType="minus"
                onClick={handleLineWidthDecrease}
                style={{ width: '20px', height: '20px' }}
              />
            </TooltipWrap>
            <SizeWrap width={lineWidth >= 10 ? 40 : 33}>
              <InputNumber
                size="middle"
                controls={false}
                variant="borderless"
                value={lineWidth}
                min={5}
                max={30}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                onChange={(value) => {
                  if (!value) {
                    return;
                  }

                  setLineWidth(value);
                }}
              />
            </SizeWrap>
            <TooltipWrap title="크기 확대( ] )">
              <ToolBarIcon
                iconType="plus"
                onClick={handleLineWidthIncrease}
                style={{ width: '20px', height: '20px' }}
              />
            </TooltipWrap>
          </LineWidthContainer>
          <Divider />
        </>
      )}
      <TooltipWrap title="십자선(T)">
        <ToolBarIcon
          iconType="crossHair"
          isClicked={enableReticle}
          onClick={handleReticle}
        />
      </TooltipWrap>
      <TooltipWrap title="조정">
        <ToolBarIcon iconType="adjustments" onClick={handleOpenAdjustmentModal} />
      </TooltipWrap>
      <Divider />
      <TooltipWrap title="실행 취소(Ctrl+Z)">
        <ToolBarIcon iconType="arrow_back" onClick={handleUndo} />
      </TooltipWrap>
      <TooltipWrap title="재실행(Ctrl+Shift+Z)">
        <ToolBarIcon iconType="arrow_forward" onClick={handleRedo} />
      </TooltipWrap>
      {openAdjustmentModal && (
        <AdjustmentModal
          open={openAdjustmentModal}
          onSubmit={handleImageColorFilterSubmit}
        />
      )}
    </Container>
  );
};

export default ToolComponent;
