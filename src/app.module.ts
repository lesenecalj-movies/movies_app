import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthenticateModule } from './authenticate/authenticate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    AuthenticateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
