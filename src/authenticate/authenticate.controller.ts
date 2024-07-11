import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, Logger, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

type CreateSessionBody = {
  requestToken: string;
};

@Controller('authenticate')
export class AuthenticateController {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) { }

  @Get('newToken')
  async authenticate(): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('/authentication/token/new')
      );
      return data.request_token;  
    } catch (error) {
      this.logger.error({error});
      throw new HttpException(error.response.statusText, error.response.status);
    }
    
  }

  @Post('session')
  async createSession(@Body() { requestToken }: CreateSessionBody): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('/authentication/session/new', { request_token: requestToken })
      );
      return data.session_id;
    } catch (error) {
      this.logger.error({error});
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
