import { Module } from '@nestjs/common';
import { NpyService } from './npy.service';
import { NpyController } from './npy.controller';

@Module({
  providers: [NpyService],
  controllers: [NpyController],
})
export class NpyModule {}
