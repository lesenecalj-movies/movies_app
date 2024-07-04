import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AuthenticateController],
})
export class AuthenticateModule {}
