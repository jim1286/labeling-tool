import {
  PostInitSamRequest,
  PostInitSamResponse,
  PostRunSamRequest,
  PostRunSamResponse,
  PostUnInitSamResponse,
} from "@/http";
import { axiosInstance } from ".";

const SAM_URI = "/sam";

export const postInitSam = async (
  params: PostInitSamRequest
): Promise<PostInitSamResponse> => {
  const uri = `${SAM_URI}/init`;
  const res = await axiosInstance.post(uri, params);

  return res.data;
};

export const postUnInitSam = async (): Promise<PostUnInitSamResponse> => {
  const uri = `${SAM_URI}/unInit`;
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
