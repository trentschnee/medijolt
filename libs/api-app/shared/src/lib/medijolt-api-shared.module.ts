import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Adjust the path as needed

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Make sure PrismaService is exported
})
export class MedijoltApiSharedModule { }
