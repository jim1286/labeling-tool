import * as onnx from "onnxruntime-web";
import { Parsed } from "npyjs";
import _ from "lodash";
import { SmallBuffer } from "@/interface";

const useSam = () => {
  let session: onnx.InferenceSession | undefined = undefined;
  let embeddings: onnx.Tensor | undefined = undefined;

  // SAM을 메모리에 로드
  const loadOnnx = async (
    modelBuffer: SmallBuffer
  ): Promise<onnx.InferenceSession> => {
    const arrayBuffer = modelBuffer.buffer.slice(
      modelBuffer.byteOffset,
      modelBuffer.byteOffset + modelBuffer.byteLength
    );

    const session = await onnx.InferenceSession.create(arrayBuffer);
    return session;
  };

  // npy 메모리에 로드
  const loadNpyBuffer = async (buffer: SmallBuffer): Promise<onnx.Tensor> => {
    const npArray = await loadNpyFile(buffer);
    const embeddings = new onnx.Tensor(
      "float32",
      new Float32Array(npArray.data),
      npArray.shape
    );
    return embeddings;
  };

  // npy 파일을 로드
  const loadNpyFile = async (npyBuffer: SmallBuffer): Promise<Parsed> => {
    const npyjs = (await import("npyjs")).default;

    const arrayBuffer = npyBuffer.buffer.slice(
      npyBuffer.byteOffset,
      npyBuffer.byteOffset + npyBuffer.byteLength
    );
    const npy = new npyjs();
    const data = npy.parse(arrayBuffer);

    return data;
  };

  // mask array를 Uint8ClampedArray로 변환
  const arrayToUint8ClampedArray = (
    input: number[],
    width: number,
    height: number,
    color: number[] // rgba
  ): Uint8ClampedArray => {
    const [r, g, b, a] = color;
    const uint8ClampedArray = new Uint8ClampedArray(4 * width * height).fill(0);

    for (let i = 0; i < input.length; i++) {
      if (input[i] > 0) {
        uint8ClampedArray[4 * i + 0] = r;
        uint8ClampedArray[4 * i + 1] = g;
        uint8ClampedArray[4 * i + 2] = b;
        uint8ClampedArray[4 * i + 3] = a;
      }
    }

    return uint8ClampedArray;
  };

  // SAM 실행
  const runSam = async (
    session: onnx.InferenceSession,
    embeddings: onnx.Tensor,
    width: number,
    height: number,
    points: number[][], // [[x1, y1], [x2, y2], ...
    point_labels: number[], // [1, 0, ...] 1: positive, 0: negative
    box: number[][], // [[x1, y1], [x2, y2]] 좌상단, 우하단
    color: number[] // rgba
  ): Promise<Uint8ClampedArray> => {
    const r = 1024 / Math.max(height, width);
    const n_points = points.length;
    let n_box = box.length;
    if (n_box != 2) {
      n_box = 0;
    }

    const n = n_points + n_box;
    if (n == 0) {
      throw new Error("No points or boxes provided");
    }

    const pointCoords = new Float32Array(2 * (n + 1));
    const pointLabels = new Float32Array(n + 1);

    for (let i = 0; i < n_points; i++) {
      pointCoords[2 * i] = points[i][0] * r;
      pointCoords[2 * i + 1] = points[i][1] * r;
      pointLabels[i] = point_labels[i];
    }

    for (let i = 0; i < n_box; i++) {
      const label = i == 0 ? 2.0 : 3.0;
      pointCoords[2 * n_points + 2 * i] = box[i][0] * r;
      pointCoords[2 * n_points + 2 * i + 1] = box[i][1] * r;
      pointLabels[n_points + i] = label;
    }

    pointCoords[2 * n] = 0.0;
    pointCoords[2 * n + 1] = 0.0;
    pointLabels[n] = -1.0;

    const pointCoordsTensor = new onnx.Tensor("float32", pointCoords, [
      1,
      n + 1,
      2,
    ]);
    const pointLabelsTensor = new onnx.Tensor("float32", pointLabels, [
      1,
      n + 1,
    ]);
    const imageSizeTensor = new onnx.Tensor(
      "float32",
      new Float32Array([height, width]),
      [2]
    );

    const { mask_height, mask_width } = { mask_height: 256, mask_width: 256 };
    const maskInput = new onnx.Tensor(
      "float32",
      new Float32Array(mask_height * mask_width),
      [1, 1, mask_height, mask_width]
    );
    const hasMaskInput = new onnx.Tensor("float32", new Float32Array([0.0]), [
      1,
    ]);

    const feeds = {
      image_embeddings: embeddings,
      point_coords: pointCoordsTensor,
      point_labels: pointLabelsTensor,
      orig_im_size: imageSizeTensor,
      mask_input: maskInput,
      has_mask_input: hasMaskInput,
    };

    const results = await session.run(feeds);
    const masks = results["masks"];
    const scores: any = results["iou_predictions"].data;
    const best_idx = scores.indexOf(Math.max(...scores));
    const best_mask: any = masks.data.slice(
      best_idx * masks.dims[2] * masks.dims[3],
      (best_idx + 1) * masks.dims[2] * masks.dims[3]
    );

    return arrayToUint8ClampedArray(
      best_mask,
      masks.dims[2],
      masks.dims[3],
      color
    );
  };

  const initOnnx = async (modelBuffer: SmallBuffer) => {
    console.log("modelBuffer", modelBuffer);
    try {
      if (!session) {
        session = await loadOnnx(modelBuffer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initNpy = async (npyBuffer: SmallBuffer): Promise<void> => {
    console.log("npyBuffer", npyBuffer);
    try {
      embeddings = await loadNpyBuffer(npyBuffer);
    } catch (error) {
      console.log(error);
    }
  };

  const unInitSam = () => {
    session = undefined;
    embeddings = undefined;
  };

  // 메인 함수
  const getSamUint8ClampedArray = async (
    points: number[][] = [], // [[x1, y1], [x2, y2], ...
    point_labels: number[] = [], // [1, 0, ...] 1: positive, 0: negative
    box: number[][] = [], // [[x1, y1], [x2, y2]] 좌상단, 우하단,
    width: number,
    height: number,
    color: number[]
  ): Promise<Uint8ClampedArray | undefined> => {
    if (!session || !embeddings) {
      return;
    }

    let convertedBox: number[][] = [];

    if (box.length !== 0) {
      const x1 = box[0][0];
      const x2 = box[1][0];
      const y1 = box[0][1];
      const y2 = box[1][1];

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      convertedBox = [
        [minX, minY],
        [maxX, maxY],
      ];
    }

    try {
      return await runSam(
        session,
        embeddings,
        width,
        height,
        points,
        point_labels,
        convertedBox,
        color
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { initOnnx, initNpy, unInitSam, getSamUint8ClampedArray };
};

export default useSam;
