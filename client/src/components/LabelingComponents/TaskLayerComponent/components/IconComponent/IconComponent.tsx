import React from 'react';
import { Container, DeleteIcon, EyeIcon, EyeInvisibleIcon } from './styles';
import { SvgIcon } from '@/components';

interface IconComponentProps {
  isHidden: boolean;
  handleHideClick: () => void;
  handleDeleteClick: () => void;
}

const IconComponent: React.FC<IconComponentProps> = ({
  isHidden,
  handleHideClick,
  handleDeleteClick,
}) => {
  return (
    <Container>
      <SvgIcon
        size={24}
        onClick={(e) => {
          e.stopPropagation();
          handleHideClick();
        }}
        icon={isHidden ? <EyeInvisibleIcon size={16} /> : <EyeIcon size={16} />}
      />
      <SvgIcon
        size={24}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick();
        }}
        icon={<DeleteIcon size={16} />}
      />
    </Container>
  );
};

export default IconComponent;
