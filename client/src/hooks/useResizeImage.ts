import { ImageSize, ResizeImageInfo } from '@/interface';
import { useBoundStore } from '@/store';
import { LabelingUtil } from '@/utils';
import { useEffect, useLayoutEffect, useState } from 'react';
import { debounce } from 'lodash';

interface Props {
  type: 'labelingTool' | 'viewer';
  canvasRef: React.RefObject<HTMLDivElement>;
  originImageSize: ImageSize;
  scale?: number;
  initialScale?: number;
  bordered?: string;
}

const useResizeImage = (props: Props) => {
  const { type, canvasRef, originImageSize, scale, initialScale, bordered } = props;
  const setImageSize = useBoundStore((state) => state.setImageSize);
  const setInitialScale = useBoundStore((state) => state.setInitialScale);
  const [resizeInfo, setResizeInfo] = useState<ResizeImageInfo>({
    width: 0,
    height: 0,
    scale: 0,
  });

  useLayoutEffect(() => {
    if (originImageSize.width === 0 || originImageSize.height === 0) {
      return;
    }

    debounceOnChange();
  }, [canvasRef.current, originImageSize, bordered]);

  const debounceOnChange = debounce(() => {
    if (!canvasRef.current) {
      return;
    }

    let canvasWidth = canvasRef.current.offsetWidth;
    let canvasHeight = canvasRef.current.offsetHeight;

    if (bordered) {
      canvasWidth -= 8;
      canvasHeight -= 8;
    }

    const resizeInfo = LabelingUtil.getResizeInfo(
      originImageSize.width,
      originImageSize.height,
      canvasWidth,
      canvasHeight
    );

    const imageResize: ImageSize = {
      width: resizeInfo.width,
      height: resizeInfo.height,
    };

    switch (type) {
      case 'viewer': {
        setResizeInfo(resizeInfo);
        break;
      }
      case 'labelingTool': {
        if (!initialScale || scale === initialScale) {
          setImageSize(imageResize);
          setInitialScale(resizeInfo.scale);
        }
        break;
      }
    }
  }, 10);

  useEffect(() => {
    window.addEventListener('resize', debounceOnChange);

    return () => {
      window.removeEventListener('resize', debounceOnChange);
    };
  }, [debounceOnChange]);

  return resizeInfo;
};

export default useResizeImage;
