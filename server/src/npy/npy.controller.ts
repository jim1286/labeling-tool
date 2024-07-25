import { Body, Controller, Post } from '@nestjs/common';
import { NpyService } from './npy.service';
import {
  PostLoadOnnxResponse,
  PostLoadNpyResponse,
  PostRunSamResponse,
} from './npy.response';
import { PostLoadNpyRequest, PostRunSamRequest } from './npy.request';

@Controller('sam')
export class NpyController {
  constructor(private readonly npyService: NpyService) {}

  @Post('/onnx')
  loadOnnx(): Promise<PostLoadOnnxResponse> {
    return this.npyService.loadOnnx();
  }

  @Post('/npy')
  loadNpy(@Body() body: PostLoadNpyRequest): Promise<PostLoadNpyResponse> {
    return this.npyService.loadNpy(body);
  }

  @Post('/run')
  runSam(@Body() body: PostRunSamRequest): Promise<PostRunSamResponse> {
    return this.npyService.runSam(body);
  }
}
