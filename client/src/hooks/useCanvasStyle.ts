import { ImageSize } from "@/interface";
import { useEffect, useState } from "react";

const useCanvasStyle = (
  divRef: React.RefObject<HTMLDivElement>,
  imageSize: ImageSize,
  bordered?: string
) => {
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (imageSize.width === 0 || imageSize.height === 0 || !divRef.current) {
      return undefined;
    }

    let canvasWidth = divRef.current.offsetWidth;
    let canvasHeight = divRef.current.offsetHeight;

    if (bordered) {
      canvasWidth -= 8;
      canvasHeight -= 8;
    }

    if (imageSize.width === canvasWidth) {
      setCanvasStyle({ alignItems: "center" });
      return;
    }
    setCanvasStyle({ justifyContent: "center" });
  }, [imageSize, bordered]);

  return canvasStyle;
};

export default useCanvasStyle;
