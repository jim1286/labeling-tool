export interface PostInitSamRequest {
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
