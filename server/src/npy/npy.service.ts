import { Injectable } from '@nestjs/common';
import { execFile } from 'node:child_process';
import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { PostInitOnnx, PostInitNpy } from './npy.response';
import { promisify } from 'util';
import * as onnx from 'onnxruntime-node';

const execFilePromise = promisify(execFile);

@Injectable()
export class NpyService {
  inferenceSession: undefined | onnx.InferenceSession = undefined;
  tensor: undefined | onnx.Tensor = undefined;

  async createOnnxBuffer(): Promise<any> {
    const onnxPath = join(__dirname, '../../python/sam_b_decoder.onnx');

    try {
      const onnxBuffer = await fsPromises.readFile(onnxPath);
      this.inferenceSession = await this.initOnnx(onnxBuffer);
      return { inferenceSession: this.inferenceSession };
    } catch (error) {
      throw new Error('Failed to create .onnx buffer');
    }
  }

  async createNpyBuffer(): Promise<any> {
    const imagePath = '/Users/jimin/Desktop/cat_dog/cat/1.jpg'; // 이미지 파일 경로

    const npyPath = join(__dirname, '../../python/temp.npy');
    const scriptPath = join(__dirname, '../../python', 'image_to_npy.py');

    try {
      await execFilePromise('python', [scriptPath, imagePath, npyPath]);
      const npyBuffer = await fsPromises.readFile(npyPath);
      await fsPromises.rm(npyPath);

      this.tensor = await this.initNpy(npyBuffer);
      console.log(this.tensor);

      // return { npyBuffer };
    } catch (error) {
      console.error('Error executing Python script or handling file:', error);
      throw new Error('Failed to create .npy buffer');
    }
  }

  // SAM을 메모리에 로드
  loadOnnx = async (modelBuffer: Buffer): Promise<onnx.InferenceSession> => {
    const arrayBuffer = modelBuffer.buffer.slice(
      modelBuffer.byteOffset,
      modelBuffer.byteOffset + modelBuffer.byteLength,
    );

    const session = await onnx.InferenceSession.create(arrayBuffer);
    return session;
  };

  initOnnx = async (modelBuffer: Buffer): Promise<onnx.InferenceSession> => {
    try {
      return await this.loadOnnx(modelBuffer);
    } catch (error) {
      console.log(error);
    }
  };

  // npy 파일을 로드
  loadNpyFile = async (npyBuffer: Buffer): Promise<any> => {
    const npyjs = (await import('npyjs')).default;

    const arrayBuffer = npyBuffer.buffer.slice(
      npyBuffer.byteOffset,
      npyBuffer.byteOffset + npyBuffer.byteLength,
    );
    const npy = new npyjs();
    const data = npy.parse(arrayBuffer);

    return data;
  };

  // npy 메모리에 로드
  loadNpyBuffer = async (buffer: Buffer): Promise<onnx.Tensor> => {
    const npArray = await this.loadNpyFile(buffer);
    const embeddings = new onnx.Tensor(
      'float32',
      new Float32Array(npArray.data),
      npArray.shape,
    );
    return embeddings;
  };

  initNpy = async (npyBuffer: Buffer): Promise<onnx.Tensor> => {
    try {
      return await this.loadNpyBuffer(npyBuffer);
    } catch (error) {
      console.log(error);
    }
  };
}
