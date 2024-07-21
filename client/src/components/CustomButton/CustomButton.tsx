import React from 'react';
import { ButtonContainer } from './styles';
import { ButtonLoading } from './components';

type ButtonVariant = 'primary' | 'danger' | 'default' | 'ghost' | 'subtle';

interface CustomButtonProps {
  size?: 'lg' | 'md' | 'sm';
  icon?: JSX.Element;
  type?: ButtonVariant;
  children?: React.ReactNode;
  disabled?: boolean;
  position?: 'left' | 'right';
  width?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  size = 'md',
  icon,
  width,
  type = 'primary',
  children,
  disabled = false,
  position,
  onClick,
  isLoading = false,
}) => {
  const buttonInteractive = () => {
    let disableClass = disabled ? 'button-disabled' : '';
    if (type === 'ghost' && disabled) {
      disableClass = 'ghost-disabled';
    }

    let buttonSize = '';
    if (icon && !children) {
      buttonSize = `icon-${size}`;
    }

    const className = `${size} ${type}-rest ${disableClass} ${buttonSize}`;
    return className;
  };

  const handleClick = () => {
    if (disabled || isLoading) {
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonContainer
      width={width}
      position={position}
      onClick={() => handleClick()}
      className={buttonInteractive()}
      isLoading={isLoading}
    >
      {isLoading ? (
        <ButtonLoading />
      ) : (
        <>
          {icon &&
            React.cloneElement(icon, {
              ...icon.props,
            })}
          {children}
        </>
      )}
    </ButtonContainer>
  );
};
