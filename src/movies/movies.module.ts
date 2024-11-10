import { Logger, Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [Logger, MoviesRepository, MoviesService],
})
export class MoviesModule {}
