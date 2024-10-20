import { Logger, Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [Logger, MoviesRepository, MoviesService]
})
export class MoviesModule { }
