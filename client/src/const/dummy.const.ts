const catList = [...Array(10).keys()].map((index) => {
  return {
    imageId: index + 1,
    filename: `cat_${index + 1}.jpg`,
    path: `images/cat_${index + 1}.jpg`,
    isLabelConfirmed: false,
  };
});

const dogList = [...Array(10).keys()].map((index) => {
  return {
    imageId: index + 11,
    filename: `dog_${index + 1}.jpg`,
    path: `images/dog_${index + 1}.jpg`,
    isLabelConfirmed: false,
  };
});

export const collectionImageList = [...catList, ...dogList];
