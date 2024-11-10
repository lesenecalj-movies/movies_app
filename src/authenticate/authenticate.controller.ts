import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';

type CreateSessionBody = {
  requestToken: string;
};

@Controller('authenticate')
export class AuthenticateController {
  constructor(
    private readonly logger: Logger,
    private readonly authenticateService: AuthenticateService,
  ) {}

  @Get('token')
  async authenticate(): Promise<string> {
    return this.authenticateService.getNewToken();
  }

  @Post('session')
  async createSession(
    @Body() { requestToken }: CreateSessionBody,
  ): Promise<string> {
    try {
      const sessionId =
        await this.authenticateService.createSession(requestToken);
      return sessionId;
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
