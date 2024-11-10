import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface TmdbUser {
  id: number;
  username: string;
}

@Injectable()
export class TmdbAccountRepository {
  constructor(private readonly httpService: HttpService) {}

  async getTmdbAccount(sessionId: string): Promise<TmdbUser> {
    const userResponse = await await firstValueFrom(
      this.httpService.get(
        `https://api.themoviedb.org/3/account?&session_id=${sessionId}`,
      ),
    );
    return userResponse.data;
  }
}
