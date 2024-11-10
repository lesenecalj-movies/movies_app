import { Injectable } from '@nestjs/common';
import { AuthenticateRepository } from './authenticate.repository';
import { TmdbAccountService } from 'src/account/account.service';
import { UserService } from 'src/users/user.service';

class SessionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SessionError';
    Object.setPrototypeOf(this, SessionError.prototype);
  }
}

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly authenticateRepository: AuthenticateRepository,
    private readonly tmdbAccountService: TmdbAccountService,
    private readonly userService: UserService,
  ) {}

  async getNewToken(): Promise<string> {
    return this.authenticateRepository.getNewToken();
  }

  async createSession(requestToken: string): Promise<string> {
    const { success, session_id: sessionId } =
      await this.authenticateRepository.createSession(requestToken);
    if (!success) {
      throw new SessionError("La session n'a pas été créée");
    }
    // todo: handle session

    const tmdbAccount = await this.tmdbAccountService.getTmdbAccount(sessionId);

    await this.userService.save({
      tmdbId: tmdbAccount.id,
      username: tmdbAccount.username,
    });

    return sessionId;
  }
}
