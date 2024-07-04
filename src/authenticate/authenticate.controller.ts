import { Controller, Get, Post, Logger, Body, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type CreateSessionBody = {
  requestToken: string;
};

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
      const response = await fetch(`${this.tmdbApiUrl}/authentication/token/new`, this.options);
      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }
      const { request_token } = await response.json();
      return request_token;
    } catch (error) {
      this.logger.error('Error during authenticate:', new Error(error));
      throw error;
    }
  }

  @Post('session')
  async createSession(@Body() { requestToken }: CreateSessionBody): Promise<string> {
    try {
      const response = await fetch(`${this.tmdbApiUrl}/authentication/session/new`,
        {
          ... this.options,
          body: JSON.stringify({
            request_token: requestToken,
          }),
          method: 'POST',
        });
      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }
      const { session_id } = await response.json();
      return session_id;
    } catch (error) {
      this.logger.error('Error during createSession:', error);
      throw error;
    }
  }
}
