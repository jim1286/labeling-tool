export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFloatFixed = (value: number, fixed: number) => {
  if (!value || Number.isNaN(value)) {
    return 0;
  }
  return value.toFixed(fixed);
};
