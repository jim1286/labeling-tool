export const mergeImage = async (
  width: number,
  height: number,
  originImg: string,
  mergeImgList: string[]
) => {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!context) {
    return;
  }

  const loadedOriginImage = await loadImageElement(originImg);
  const loadedMergeImageList = await Promise.all(
    mergeImgList.map((mergeImg) => loadImageElement(mergeImg))
  );

  context.drawImage(loadedOriginImage, 0, 0, width, height);

  loadedMergeImageList.forEach((loadedMergeImage) =>
    context.drawImage(loadedMergeImage, 0, 0, width, height)
  );

  return canvas.toDataURL("image/jpeg", 1);
};

export const loadImageElement = (img: string): Promise<HTMLImageElement> => {
  return new Promise((res, rej) => {
    if (!img) {
      rej();
      return;
    }
    const image = new Image();

    image.src = img;
    image.crossOrigin = "Anonymous";

    image.onload = () => {
      res(image);
    };

    image.onerror = () => {
      rej();
    };
  });
};

export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = (err) => {
      reject(err);
    };

    img.src = src;
  });
};
