import React from "react";
import { Container } from "./styles";
import { DrawModeEnum } from "@/enums";
import { BrushMode, SamMode } from "./components";
import { ToolBarIcon, TooltipWrap } from "@/components";
import { useMode } from "./hook";
import { Spin, notification } from "antd";
import { useBoundStore } from "@/store";
import { useKeyDown } from "@/hooks";

const ModeComponent: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const { handleClickSam, handleClickBrush } = useMode(api);
  const drawMode = useBoundStore((state) => state.drawMode);

  const Mode = (() => {
    switch (drawMode) {
      case DrawModeEnum.BRUSH: {
        return <BrushMode />;
      }
      case DrawModeEnum.SAM: {
        return <SamMode />;
      }
      case DrawModeEnum.NONE: {
        return (
          <>
            {contextHolder}
            <TooltipWrap title="스마트 라벨링(Q)">
              <ToolBarIcon iconType="wand" onClick={handleClickSam} />
            </TooltipWrap>
            <TooltipWrap title="브러시(W)">
              <ToolBarIcon iconType="brush" onClick={handleClickBrush} />
            </TooltipWrap>
          </>
        );
      }
    }
  })();

  useKeyDown(() => {
    if (drawMode === DrawModeEnum.NONE) {
      handleClickBrush();
    }
  }, ["KeyW"]);

  useKeyDown(() => {
    if (drawMode === DrawModeEnum.NONE) {
      handleClickSam();
    }
  }, ["KeyQ"]);

  return <Container>{Mode}</Container>;
};

export default ModeComponent;
