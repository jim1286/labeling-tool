import {
  PostInitSamRequest,
  PostInitSamResponse,
  PostUnInitSamResponse,
} from "@/http";
import { SamService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const usePostInitSamMutation = () => {
  return useMutation<PostInitSamResponse, Error, PostInitSamRequest>({
    mutationFn: SamService.postInitSam,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const usePostUnInitSamMutation = () => {
  return useMutation<PostUnInitSamResponse, Error>({
    mutationFn: () => SamService.postUnInitSam(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
