import { Injectable } from "@nestjs/common";
import { HttpModuleOptionsFactory, HttpModuleOptions } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  tmdbToken: string;
  tmdbApiUrl: string;
  constructor(private configService: ConfigService) {
    this.tmdbToken = this.configService.get<string>('tmdb.token') as string;
    this.tmdbApiUrl = this.configService.get<string>('tmdb.apiUrl') as string;
  }
  
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      baseURL: this.tmdbApiUrl,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.tmdbToken}`
      },
    };
  }
}