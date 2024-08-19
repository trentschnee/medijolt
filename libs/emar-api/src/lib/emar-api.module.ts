// import { Module } from '@nestjs/common';
// import { AuthenticateUserUseCase } from '@medijolt/shared/auth';
// import { EmarUserRepository } from './emar-user.repository';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: '60m' },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [
//     EmarUserRepository,
//     AuthenticateUserUseCase,
//     {
//       provide: 'UserRepository',
//       useClass: EmarUserRepository,
//     },
//   ],
//   exports: [AuthenticateUserUseCase],
// })
// export class EmarAuthModule { }
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticateUserUseCase } from './core/use-cases/authenticate-user.use-case';

@Module({
  imports: [HttpModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60m' },
    }),
    inject: [ConfigService],
  }),
  ], // Import HttpModule to enable HTTP communication

  providers: [AuthenticateUserUseCase],
  exports: [AuthenticateUserUseCase],
})
export class EmarApiModule { }
