import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GroqHttpConfigService implements HttpModuleOptionsFactory {
  private readonly groqApiKey: string;
  private readonly groqBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.groqApiKey = this.configService.get<string>('groq.token')!;
    this.groqBaseUrl = this.configService.get<string>('groq.apiUrl')!;
  }

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 10000,
      baseURL: this.groqBaseUrl,
      headers: {
        Authorization: `Bearer ${this.groqApiKey}`,
        'Content-Type': 'application/json',
      },
    };
  }
}
