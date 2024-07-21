import { DefectType, EditData } from '@/interface';
import useSamToCanvas from './useSamToCanvas';
import { useBoundStore } from '@/store';
import { EncodeUtil, LabelingUtil } from '@/utils';
import { CanvasDataType } from '@/enums';

const useSamEditData = () => {
  const samToCanvas = useSamToCanvas();
  const editDataList = useBoundStore((state) => state.editDataList);
  const originImageSize = useBoundStore((state) => state.originImageSize);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);

  const getSamEditData = async () => {
    const canvas = document.createElement('canvas');

    canvas.width = originImageSize.width;
    canvas.height = originImageSize.height;

    const ctx = canvas.getContext('2d');

    if (!ctx || !selectedDefectType) {
      return;
    }

    const encoded = await getEncodedMaskData(ctx, selectedDefectType);
    const newEditData: EditData = {
      type: CanvasDataType.ENCODED,
      data: JSON.stringify(encoded),
    };

    return newEditData;
  };

  const getEncodedMaskData = async (
    ctx: CanvasRenderingContext2D,
    selectedDefectType: DefectType
  ) => {
    await samToCanvas(
      'original',
      ctx,
      selectedDefectType.color,
      originImageSize,
      originImageSize,
      editDataList
    );

    const imageData = ctx.getImageData(
      0,
      0,
      originImageSize.width,
      originImageSize.height
    );

    const newMaskData = LabelingUtil.convertImageDataToMaskData(
      imageData,
      selectedDefectType.defectTypeNumber
    );

    return EncodeUtil.encode(newMaskData);
  };

  return getSamEditData;
};

export default useSamEditData;
