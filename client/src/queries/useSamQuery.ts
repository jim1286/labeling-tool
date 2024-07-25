import {
  PostLoadNpyRequest,
  PostLoadNpyResponse,
  PostLoadOnnxResponse,
} from "@/http";
import { SamService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const usePostLoadNpyMutation = () => {
  return useMutation<PostLoadNpyResponse, Error, PostLoadNpyRequest>({
    mutationFn: SamService.postLoadNpy,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const usePostLoadOnnxMutation = () => {
  return useMutation<PostLoadOnnxResponse, Error>({
    mutationFn: () => SamService.postLoadOnnx(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
