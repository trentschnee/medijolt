import { UsersModule } from '@medijolt/api/users';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule],
  providers: [AppService],
})
export class AppModule { }
