export interface PostLoadNpyResponse {
  message: string;
}

export interface PostLoadOnnxResponse {
  message: string;
}

export class PostRunSamResponse {
  data: Uint8ClampedArray | undefined;
}
