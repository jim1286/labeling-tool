import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { PostInitSamResponse, PostRunSamResponse } from './npy.response';
import * as onnx from 'onnxruntime-node';
import { dynamicImport } from 'tsimportlib';
import { PostInitSamRequest, PostRunSamRequest } from './npy.request';

@Injectable()
export class NpyService {
  inferenceSession: undefined | onnx.InferenceSession = undefined;
  tensor: undefined | onnx.Tensor = undefined;

  async initSam(body: PostInitSamRequest): Promise<PostInitSamResponse> {
    const { fileName } = body;

    if (!this.inferenceSession) {
      await this.loadOnnx();
    }
    await this.loadNpy(fileName);

    return { message: 'init sam' };
  }

  async unInitSam() {
    this.tensor = undefined;
    this.inferenceSession = undefined;

    return { message: 'unInit sam' };
  }

  async runSam(body: PostRunSamRequest): Promise<PostRunSamResponse> {
    const { points, point_labels, box, width, height } = body;

    if (!this.tensor) {
      throw new Error('tensor is not loaded');
    }

    if (!this.inferenceSession) {
      throw new Error('inferenceSession is not loaded');
    }

    const r = 1024 / Math.max(height, width);
    const n_points = points.length;
    let n_box = box.length;
    if (n_box != 2) {
      n_box = 0;
    }

    const n = n_points + n_box;
    if (n == 0) {
      throw new Error('No points or boxes provided');
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

    const pointCoordsTensor = new onnx.Tensor('float32', pointCoords, [
      1,
      n + 1,
      2,
    ]);
    const pointLabelsTensor = new onnx.Tensor('float32', pointLabels, [
      1,
      n + 1,
    ]);
    const imageSizeTensor = new onnx.Tensor(
      'float32',
      new Float32Array([height, width]),
      [2],
    );

    const { mask_height, mask_width } = { mask_height: 256, mask_width: 256 };
    const maskInput = new onnx.Tensor(
      'float32',
      new Float32Array(mask_height * mask_width),
      [1, 1, mask_height, mask_width],
    );
    const hasMaskInput = new onnx.Tensor('float32', new Float32Array([0.0]), [
      1,
    ]);

    const feeds = {
      image_embeddings: this.tensor,
      point_coords: pointCoordsTensor,
      point_labels: pointLabelsTensor,
      orig_im_size: imageSizeTensor,
      mask_input: maskInput,
      has_mask_input: hasMaskInput,
    };

    const results = await this.inferenceSession.run(feeds);
    const masks = results['masks'];
    const scores: any = results['iou_predictions'].data;
    const best_idx = scores.indexOf(Math.max(...scores));
    const best_mask: any = masks.data.slice(
      best_idx * masks.dims[2] * masks.dims[3],
      (best_idx + 1) * masks.dims[2] * masks.dims[3],
    );

    return {
      data: Object.keys(best_mask).map((key) => best_mask[key]),
    };
  }

  loadOnnx = async () => {
    const onnxPath = join(__dirname, '../../python/sam_b_decoder.onnx');
    const onnxBuffer = await fsPromises.readFile(onnxPath);

    this.inferenceSession = await this.loadModelBuffer(onnxBuffer);
  };

  loadNpy = async (fileName: string) => {
    const npyPath = join(
      __dirname,
      '../../python/',
      fileName.replace('.jpg', '.npy'),
    );

    const npyBuffer = await fsPromises.readFile(npyPath);
    this.tensor = await this.loadNpyBuffer(npyBuffer);
  };

  arrayToUint8ClampedArray = (
    input: number[],
    width: number,
    height: number,
    color: number[], // rgba
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

  loadModelBuffer = async (
    modelBuffer: Buffer,
  ): Promise<onnx.InferenceSession> => {
    const arrayBuffer = modelBuffer.buffer.slice(
      modelBuffer.byteOffset,
      modelBuffer.byteOffset + modelBuffer.byteLength,
    );

    const session = await onnx.InferenceSession.create(arrayBuffer);
    return session;
  };

  loadNpyFile = async (npyBuffer: Buffer): Promise<any> => {
    const { default: npyjs } = (await dynamicImport(
      'npyjs',
      module,
    )) as typeof import('npyjs');

    const arrayBuffer = npyBuffer.buffer.slice(
      npyBuffer.byteOffset,
      npyBuffer.byteOffset + npyBuffer.byteLength,
    );
    const npy = new npyjs();
    const data = npy.parse(arrayBuffer);

    return data;
  };

  loadNpyBuffer = async (buffer: Buffer): Promise<onnx.Tensor> => {
    const npArray = await this.loadNpyFile(buffer);
    const embeddings = new onnx.Tensor(
      'float32',
      new Float32Array(npArray.data),
      npArray.shape,
    );
    return embeddings;
  };
}
