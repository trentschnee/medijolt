import { UserManagementModule } from '@medijolt/user-management-api';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserManagementModule, // Importing your UserManagementModule
  ]
})
export class AppModule { }
