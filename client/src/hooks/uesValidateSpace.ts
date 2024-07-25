import { useEffect, useState } from 'react';

const uesValidateSpace = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(true);

  useEffect(() => {
    const newValidate = validate(inputValue);
    setIsValidate(newValidate);
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const checkSpace = (str: string) => {
    if (str.search(/\s/) !== -1) {
      return false;
    }

    return true;
  };

  const validate = (value: string) => {
    return checkSpace(value);
  };

  const resetState = () => {
    setInputValue('');
    setIsValidate(true);
  };

  return { inputValue, isValidate, handleInputChange, resetState };
};

export default uesValidateSpace;
