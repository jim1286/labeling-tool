import React from 'react';
import { SvgIconContainer } from './styles';

interface SvgIconProps {
  icon: JSX.Element;
  size?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  icon,
  size,
  style,
  disabled = false,
  onClick,
}) => {
  const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  return (
    <SvgIconContainer size={size} onClick={(e) => handleIconClick(e)} style={style}>
      {icon &&
        React.cloneElement(icon, {
          ...icon.props,
        })}
    </SvgIconContainer>
  );
};

export default SvgIcon;
