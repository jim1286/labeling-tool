import React from 'react';
import { StyledTitle } from './styles';
import { TitleProps } from 'antd/es/typography/Title';

interface CustomTitleProps extends TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<CustomTitleProps> = ({ children, ...rest }) => {
  return <StyledTitle {...rest}>{children}</StyledTitle>;
};

export default Title;
