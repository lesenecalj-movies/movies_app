import { Controller, Get, Post, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('authenticate')
export class AuthenticateController {
  options: any;
  private logger: Logger;
  tmdbApiUrl: string;
  constructor(private configService: ConfigService) {
    this.logger = new Logger();
    const tmdbToken = this.configService.get<string>('TMDB_TOKEN');
    this.tmdbApiUrl = this.configService.get<string>('TMDB_API_URL') as string;
    this.options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tmdbToken}`
      }
    };
  }

  @Get('newToken')
  async authenticate(): Promise<string> {
    try {
      const request = await fetch(`${this.tmdbApiUrl}/authentication/token/new`, this.options);
      const { request_token } = await request.json();
      return request_token;  
    } catch (error) {
      this.logger.error('Error during authenticate:', new Error(error));
      throw error;
    }
  }

  @Post('session')
  async createSession(): Promise<string> {
    try {
      const session = await fetch(`${this.tmdbApiUrl}/authentication/session/new`,
        {
          ... this.options,
          body: {
            request_token: '32cc2643d123363302cbbb3cf56fc87d74002b11'
          },
          method: 'POST',
        });
      const { session_id } = await session.json();
      return session_id;
    } catch (error) {
      this.logger.error('Error during createSession:', new Error(error));
      throw error;
    }
  }
}
