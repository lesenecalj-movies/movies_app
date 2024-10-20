import { Logger, Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';

@Module({
  imports: [],
  controllers: [AuthenticateController],
  providers: [Logger]
})
export class AuthenticateModule {}
