import { useBoundStore } from '@/store';
import { useEffect } from 'react';

const useKeyUp = (callback: () => void, codes: string[]) => {
  const disableKeyInLabeling = useBoundStore((state) => state.disableKeyInLabeling);

  const onKeyUp = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = codes.some((code) => event.code === code);

    if (wasAnyKeyPressed && !disableKeyInLabeling) {
      event.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);
};

export default useKeyUp;
