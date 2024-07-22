import {
  PostLoadNpyRequest,
  PostLoadNpyResponse,
  PostLoadOnnxResponse,
  PostRunSamRequest,
  PostRunSamResponse,
} from "@/http";
import { axiosInstance } from ".";

const SAM_URI = "/sam";

export const postLoadNpy = async (
  params: PostLoadNpyRequest
): Promise<PostLoadNpyResponse> => {
  const uri = `${SAM_URI}/npy`;
  const res = await axiosInstance.post(uri, params);

  return res.data;
};

export const postLoadOnnx = async (): Promise<PostLoadOnnxResponse> => {
  const uri = `${SAM_URI}/onnx`;
  const res = await axiosInstance.post(uri);

  return res.data;
};

export const postRunSam = async (
  params: PostRunSamRequest
): Promise<PostRunSamResponse> => {
  const uri = `${SAM_URI}/run`;
  const res = await axiosInstance.post(uri, params);

  return res.data;
};
