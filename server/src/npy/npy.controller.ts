import { Body, Controller, Post } from '@nestjs/common';
import { NpyService } from './npy.service';
import {
  PostLoadOnnxResponse,
  PostLoadNpyResponse,
  PostRunSamResponse,
} from './npy.response';
import { PostRunSamRequest } from './npy.request';

@Controller('sam')
export class NpyController {
  constructor(private readonly npyService: NpyService) {}

  @Post('/onnx')
  loadOnnx(): Promise<PostLoadOnnxResponse> {
    return this.npyService.loadOnnx();
  }

  @Post('/npy')
  loadNpy(): Promise<PostLoadNpyResponse> {
    return this.npyService.loadNpy();
  }

  @Post('/run')
  runSam(@Body() body: PostRunSamRequest): Promise<PostRunSamResponse> {
    return this.npyService.runSam(body);
  }
}
