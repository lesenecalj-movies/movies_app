import { HttpModule } from '@nestjs/axios';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpConfigService } from 'src/httpConfig.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  controllers: [MoviesController],
  providers: [Logger]
})
export class MoviesModule {}
