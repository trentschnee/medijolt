
import { Module } from '@nestjs/common';
import { EmarApiModule } from '@medijolt/emar-api';
@Module({
  imports: [EmarApiModule],
})
export class AppModule { }
