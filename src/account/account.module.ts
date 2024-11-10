import { Logger, Module } from '@nestjs/common';
import { TmdbAccountRepository } from './account.repository';
import { TmdbAccountService } from './account.service';

@Module({
  imports: [],
  controllers: [],
  providers: [Logger, TmdbAccountRepository, TmdbAccountService],
})
export class AccountModule {}
