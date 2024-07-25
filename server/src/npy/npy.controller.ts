import { Body, Controller, Post } from '@nestjs/common';
import { NpyService } from './npy.service';
import {
  PostInitSamResponse,
  PostRunSamResponse,
  PostUnInitSamResponse,
} from './npy.response';
import { PostInitSamRequest, PostRunSamRequest } from './npy.request';

@Controller('sam')
export class NpyController {
  constructor(private readonly npyService: NpyService) {}

  @Post('/init')
  initSam(@Body() body: PostInitSamRequest): Promise<PostInitSamResponse> {
    return this.npyService.initSam(body);
  }

  @Post('/unInit')
  unInitSam(): Promise<PostUnInitSamResponse> {
    return this.npyService.unInitSam();
  }

  @Post('/run')
  runSam(@Body() body: PostRunSamRequest): Promise<PostRunSamResponse> {
    return this.npyService.runSam(body);
  }
}
