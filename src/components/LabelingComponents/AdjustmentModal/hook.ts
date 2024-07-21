import React, { useState } from 'react';
import { UseAdjustmentProps } from './interface';

const useAdjustment = (props: UseAdjustmentProps) => {
  const [brightness, setBrightness] = useState(props.imageColorFilter.brightness);
  const [contrast, setContrast] = useState(props.imageColorFilter.contrast);
  const [saturation, setSaturation] = useState(props.imageColorFilter.saturate);

  const onChangeExposure = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(parseInt(e.target.value));
  };

  const onChangeContrast = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContrast(parseInt(e.target.value));
  };

  const onChangeSaturation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(parseInt(e.target.value));
  };

  const reset = () => {
    setBrightness(50);
    setContrast(50);
    setSaturation(50);
  };

  return {
    brightness,
    contrast,
    saturation,
    reset,
    onChangeExposure,
    onChangeContrast,
    onChangeSaturation,
  };
};

export default useAdjustment;
