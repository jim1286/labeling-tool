import { DrawModeEnum, MouseModeEnum } from '@/enums';
import { useBoundStore } from '@/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Point } from '@/interface';
import { debounce, throttle } from 'lodash';
import useToolAction from '@/components/LabelingComponents/ToolComponent/hook';

const useCanvasAction = (canvasRef: React.RefObject<HTMLDivElement>) => {
  const drawMode = useBoundStore((state) => state.drawMode);
  const mouseMode = useBoundStore((state) => state.mouseMode);
  const scale = useBoundStore((state) => state.scale);
  const imageSize = useBoundStore((state) => state.imageSize);
  const crosshairX = useRef<HTMLDivElement>(null);
  const crosshairY = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [point, setPoint] = useState<Point>({ x: 0, y: 0 });
  const [canvasEnter, setCanvasEnter] = useState(false);
  const { handleImageIncrease, handleImageDecrease } = useToolAction();

  const debounceWheel = useMemo(
    () =>
      debounce((e: React.WheelEvent<HTMLDivElement>, point: Point) => {
        if (!canvasRef.current) {
          return;
        }

        if (e.deltaY > 0) {
          const decreasedScale = -scale / 10;
          handleImageDecrease(decreasedScale);
          return;
        }

        if (e.deltaY < 0) {
          if (imageSize.width * imageSize.height > 10000000) {
            return;
          }

          const increasedScale = scale / 10;
          handleImageIncrease(increasedScale);

          canvasRef.current.scrollTo({
            left: point.x,
            top: point.y,
          });

          return;
        }
      }, 5),
    [scale, imageSize]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>, point: Point) => {
      debounceWheel(e, point);
    },
    [debounceWheel]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const isDraggable =
      drawMode === DrawModeEnum.NONE || mouseMode === MouseModeEnum.DRAG;

    if (isDraggable) {
      e.preventDefault();
      setIsDragging(true);
    }
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasEnter) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    if (canvasRef.current && crosshairX.current && e.nativeEvent.offsetX > 0) {
      crosshairX.current.style.left =
        e.clientX - rect.left + canvasRef.current.scrollLeft + 'px';
    }

    if (canvasRef.current && crosshairY.current && e.nativeEvent.offsetY > 0) {
      crosshairY.current.style.top = canvasRef.current.scrollTop + e.pageY - 104 + 'px';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !canvasRef.current) {
      return;
    }

    const { movementX, movementY } = e;

    canvasRef.current.scrollLeft -= movementX;
    canvasRef.current.scrollTop -= movementY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const throttleCanvasMouseMove = useMemo(
    () =>
      throttle((xPosition: number, yPosition: number) => {
        setPoint({ x: xPosition, y: yPosition });
      }, 5),
    []
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();

      const xPosition = e.clientX - rect.left;
      const yPosition = e.clientY - rect.top;

      throttleCanvasMouseMove(xPosition, yPosition);
    },
    [throttleCanvasMouseMove]
  );

  const handleMouseEnter = () => {
    setCanvasEnter(true);
  };

  const handleMouseLeave = () => {
    setCanvasEnter(false);
  };

  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    if (canvasEnter) {
      window.addEventListener('wheel', preventScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
    };
  }, [canvasEnter]);

  return {
    scale,
    isDragging,
    point,
    crosshairX,
    crosshairY,
    canvasEnter,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    handleContextMenu,
    handleCanvasMouseMove,
    handleContainerMouseMove,
  };
};

export default useCanvasAction;
