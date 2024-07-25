import { Module } from '@nestjs/common';
import { NpyModule } from './npy/npy.module';

@Module({
  imports: [NpyModule],
})
export class AppModule {}
