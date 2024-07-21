import { LabelingModeEnum } from "@/enums";
import { GetNpyBufferResponse, GetOnnxBufferResponse } from "@/http";
import { SamService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetNpyBufferQuery = (
  labelingMode: LabelingModeEnum,
  imagePath?: string
) => {
  return useQuery<GetNpyBufferResponse, Error>({
    queryKey: ["getNpyBufferQuery", imagePath],
    enabled: !!imagePath && labelingMode === LabelingModeEnum.SEGMENTATION,
    queryFn: () => SamService.getNpyBuffer({ imagePath: imagePath! }),
  });
};

export const useGetOnnxBufferQuery = (labelingMode: LabelingModeEnum) => {
  return useQuery<GetOnnxBufferResponse, Error>({
    queryKey: ["getOnnxBufferQuery"],
    enabled: labelingMode === LabelingModeEnum.SEGMENTATION,
    queryFn: () => SamService.getOnnxBuffer(),
  });
};
