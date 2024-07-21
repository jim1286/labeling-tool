import React from 'react';
import { Loading, Spinner, SpinnerBackGround } from './styles';

export const ButtonLoading: React.FC = () => {
  return (
    <Loading>
      <Spinner />
      <SpinnerBackGround />
    </Loading>
  );
};
