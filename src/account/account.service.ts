import { Injectable } from '@nestjs/common';
import { TmdbAccountRepository, TmdbUser } from './account.repository';

@Injectable()
export class TmdbAccountService {
  constructor(private readonly accountRepository: TmdbAccountRepository) {}

  async getTmdbAccount(sessionId: string): Promise<TmdbUser> {
    return this.accountRepository.getTmdbAccount(sessionId);
  }
}
