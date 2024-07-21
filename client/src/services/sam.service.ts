import {
  GetNpyBufferRequest,
  GetNpyBufferResponse,
  GetOnnxBufferResponse,
} from "@/http";
import { axiosInstance } from ".";

const SAM_URI = "/sam";

export const getNpyBuffer = async (
  params: GetNpyBufferRequest
): Promise<GetNpyBufferResponse> => {
  const uri = `${SAM_URI}/npy`;
  const res = await axiosInstance.get(uri, { params });

  return res.data;
};

export const getOnnxBuffer = async (): Promise<GetOnnxBufferResponse> => {
  const uri = `${SAM_URI}/onnx`;
  const res = await axiosInstance.get(uri);

  return res.data;
};
