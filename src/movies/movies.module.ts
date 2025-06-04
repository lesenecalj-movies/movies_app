import { Logger, Module } from '@nestjs/common';
import { GroqModule } from 'src/external-api/groq/groq.module';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

@Module({
  imports: [GroqModule],
  controllers: [MoviesController],
  providers: [Logger, MoviesRepository, MoviesService],
})
export class MoviesModule {}
