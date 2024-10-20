import { Controller, Get, HttpException, Logger, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PaginatedMovie } from './types/movies.type';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly logger: Logger,
  ) {
  }

  @Get('popular')
  async getMovies(@Query('page') page: number = 1): Promise<PaginatedMovie> {
    try {
      return this.moviesService.getPopularMoviesByPage(page);
    } catch (error) {
      this.logger.error({error});
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: number): Promise<any> {
    try {
      return this.moviesService.getMovieDetailsById(id);
    } catch (error) {
      this.logger.error({error});
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
