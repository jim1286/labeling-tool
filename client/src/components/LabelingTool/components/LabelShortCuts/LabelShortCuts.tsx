import { LabelingModeEnum } from "@/enums";
import {
  ClsShortCuts,
  KeyPointShortCuts,
  OdShortCuts,
  SegShortCuts,
} from "./components";
import { useBoundStore } from "@/store";
import React, { useEffect, useState } from "react";
import { FlexColumn, FlexRow } from "@/components";
import { BL } from "@/theme";
import { IconHome } from "@tabler/icons-react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const LabelShortCuts: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const setLabelingMode = useBoundStore((state) => state.setLabelingMode);
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    delay(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  const delay = (callback: () => void, ms: number) => {
    return new Promise(() => setTimeout(callback, ms));
  };

  const handleHomeClick = () => {
    setLabelingMode(LabelingModeEnum.NONE);
    navigate("/home");
  };

  if (isLoading) {
    return null;
  }

  return (
    <FlexColumn
      width="100%"
      gap={30}
      style={{
        marginTop: "15px",
        paddingRight: "10px",
        paddingLeft: "20px",
        background: "#141414",
      }}
    >
      <FlexRow
        gap={10}
        alignItems="center"
        style={{ cursor: "pointer" }}
        onClick={handleHomeClick}
      >
        <IconHome color={theme.icon.primary} size={20} />
        <BL>홈으로 가기</BL>
      </FlexRow>
      {(() => {
        switch (labelingMode) {
          case LabelingModeEnum.CLASSIFICATION:
            return <ClsShortCuts />;
          case LabelingModeEnum.OBJECT_DETECTION:
            return <OdShortCuts />;
          case LabelingModeEnum.SEGMENTATION:
            return <SegShortCuts />;
          case LabelingModeEnum.KEY_POINT:
            return <KeyPointShortCuts />;
          default:
            return null;
        }
      })()}
    </FlexColumn>
  );
};

export default LabelShortCuts;
