import { HttpModule } from '@nestjs/axios';
import { Module, Logger } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpConfigService } from 'src/httpConfig.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  controllers: [AuthenticateController],
  providers: [Logger]
})
export class AuthenticateModule {}
