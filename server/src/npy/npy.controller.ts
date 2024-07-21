import { Controller, Get } from '@nestjs/common';
import { NpyService } from './npy.service';
import { PostInitOnnx, PostInitNpy } from './npy.response';

@Controller('sam')
export class NpyController {
  constructor(private readonly npyService: NpyService) {}

  @Get('/onnx')
  createOnnxBuffer(): Promise<PostInitOnnx> {
    return this.npyService.createOnnxBuffer();
  }

  @Get('/npy')
  createNpyBuffer(): Promise<PostInitNpy> {
    return this.npyService.createNpyBuffer();
  }
}
