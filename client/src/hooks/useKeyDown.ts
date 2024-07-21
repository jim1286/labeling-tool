import { useBoundStore } from './../store/useBoundStore';
import { useEffect } from 'react';

const useKeyDown = (callback: (event: KeyboardEvent) => void, codes: string[]) => {
  const disableKeyInLabeling = useBoundStore((state) => state.disableKeyInLabeling);

  const onKeyDown = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = codes.some((code) => event.code === code);

    if (wasAnyKeyPressed && !disableKeyInLabeling) {
      event.preventDefault();
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

export default useKeyDown;
