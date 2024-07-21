import React from "react";
import {
  IconAdjustments,
  IconArrowBack,
  IconArrowForward,
  IconBrush,
  IconCircleDot,
  IconCrosshair,
  IconEraser,
  IconFocusAuto,
  IconMinus,
  IconPlus,
  IconRectangle,
  IconSettings,
  IconWand,
} from "@tabler/icons-react";
import { SvgIcon } from "@/components";
import { useTheme } from "styled-components";

type IconType =
  | "brush"
  | "eraser"
  | "auto"
  | "wand"
  | "plus"
  | "minus"
  | "setting"
  | "adjustments"
  | "arrow_back"
  | "arrow_forward"
  | "dot"
  | "box"
  | "sam-point"
  | "sam-box"
  | "crossHair";

interface ToolBarIconProps {
  iconType: IconType;
  iconColor?: string;
  disabled?: boolean;
  isClicked?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ToolBarIcon: React.FC<ToolBarIconProps> = ({
  iconType,
  iconColor,
  disabled,
  isClicked,
  style,
  onClick,
}) => {
  const theme = useTheme();

  const icon = (() => {
    switch (iconType) {
      case "wand": {
        return <IconWand />;
      }
      case "brush": {
        return <IconBrush />;
      }
      case "auto": {
        return <IconFocusAuto />;
      }
      case "eraser": {
        return <IconEraser />;
      }
      case "plus": {
        return <IconPlus />;
      }
      case "minus": {
        return <IconMinus />;
      }
      case "adjustments": {
        return <IconAdjustments />;
      }
      case "arrow_back": {
        return <IconArrowBack />;
      }
      case "arrow_forward": {
        return <IconArrowForward />;
      }
      case "setting": {
        return <IconSettings />;
      }
      case "sam-point":
      case "dot": {
        return <IconCircleDot />;
      }
      case "sam-box":
      case "box": {
        return <IconRectangle />;
      }
      case "crossHair": {
        return <IconCrosshair />;
      }
    }
  })();

  const containerStyle = (() => {
    if (!isClicked) {
      return;
    }

    switch (iconType) {
      case "sam-point":
      case "sam-box":
      case "eraser":
      case "brush":
      case "crossHair": {
        return { background: `${theme.bg.fill.primary.active}` };
      }

      default: {
        return;
      }
    }
  })();

  return (
    <SvgIcon
      size={32}
      icon={React.cloneElement(icon, {
        strokeWidth: 1.5,
        color: disabled
          ? theme.icon.disabled
          : iconColor
          ? iconColor
          : isClicked
          ? theme.icon.primary
          : theme.icon.secondary,
      })}
      onClick={() => {
        if (disabled || !onClick) {
          return;
        }

        onClick();
      }}
      style={{
        margin: "0 4px",
        ...style,
        ...containerStyle,
      }}
    />
  );
};

export default ToolBarIcon;
