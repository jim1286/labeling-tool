export interface PostLoadNpyRequest {
  fileName: string;
}

export interface PostRunSamRequest {
  points: number[][];
  point_labels: number[];
  box: number[][];
  width: number;
  height: number;
  color: number[];
}
