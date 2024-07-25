import { ImageSize } from '@/interface';

const useCanvasStyle = () => {
  const getCanvasStyle = (
    divRef: React.RefObject<HTMLDivElement>,
    imageSize: ImageSize,
    bordered?: string
  ) => {
    return (() => {
      if (imageSize.width === 0 || imageSize.height === 0 || !divRef.current) {
        return undefined;
      }

      let canvasWidth = divRef.current.offsetWidth;
      let canvasHeight = divRef.current.offsetHeight;

      if (bordered) {
        canvasWidth -= 8;
        canvasHeight -= 8;
      }

      if (canvasWidth < imageSize.width && canvasHeight < imageSize.height) {
        return undefined;
      }

      const imageRatio = imageSize.width / imageSize.height;
      const canvasRatio = canvasWidth / canvasHeight;

      if (imageRatio > canvasRatio) {
        return { alignItems: 'center' };
      }
      return { justifyContent: 'center' };
    })();
  };

  return getCanvasStyle;
};

export default useCanvasStyle;
