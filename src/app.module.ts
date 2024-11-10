import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { MoviesModule } from './movies/movies.module';
import configuration from './config';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from './httpConfig.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      load: [configuration],
    }),
    {
      ...HttpModule.registerAsync({
        imports: [ConfigModule],
        useClass: HttpConfigService,
      }),
      global: true,
    },
    MongooseModule.forRoot('mongodb://localhost:27017/movies-dev'),
    AuthenticateModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
