import { Logger, Module } from '@nestjs/common';
import { TmdbAccountRepository } from 'src/account/account.repository';
import { TmdbAccountService } from 'src/account/account.service';
import { UsersModule } from 'src/users/user.module';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateRepository } from './authenticate.repository';
import { AuthenticateService } from './authenticate.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthenticateController],
  providers: [
    Logger,
    AuthenticateRepository,
    TmdbAccountRepository,
    AuthenticateService,
    TmdbAccountService,
  ],
})
export class AuthenticateModule {}
