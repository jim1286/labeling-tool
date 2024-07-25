import { BM } from '@/theme';
import { Tooltip } from 'antd';
import React from 'react';
import { TooltipSpan } from './styles';

interface Props {
  title: string;
  children: React.ReactNode;
}

const TooltipWrap: React.FC<Props> = ({ title, children }) => {
  return (
    <Tooltip placement="bottom" title={<BM>{title}</BM>} trigger="hover">
      <TooltipSpan>{children}</TooltipSpan>
    </Tooltip>
  );
};

export default TooltipWrap;
