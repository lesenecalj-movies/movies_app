import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GroqService } from './groq.service';
import { GroqHttpConfigService } from './groq.http.config.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: GroqHttpConfigService,
    }),
  ],
  providers: [
    GroqService,
    GroqHttpConfigService,
    {
      provide: 'GroqHttpService',
      useExisting: HttpService,
    },
  ],
  exports: [GroqService],
})
export class GroqModule {}
