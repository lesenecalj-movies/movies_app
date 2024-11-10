import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

type sessionModel = {
  success: boolean;
  session_id: string;
};

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly httpService: HttpService) {}

  async getNewToken(): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService.get('/authentication/token/new'),
    );
    return data.request_token;
  }

  async createSession(requestToken: string): Promise<sessionModel> {
    const { data } = await firstValueFrom(
      this.httpService.post('/authentication/session/new', {
        request_token: requestToken,
      }),
    );
    return data;
  }
}
