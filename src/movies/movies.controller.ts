import {
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ListResponse, Movie, Categorie } from './types/movies.type';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly logger: Logger,
  ) {}

  @Get('categories')
  async getCategories(): Promise<Categorie[]> {
    try {
      return this.moviesService.getCategories();
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('popular')
  async getPopularMovies(
    @Query('page') page: number = 1,
  ): Promise<ListResponse<Movie>> {
    try {
      return this.moviesService.getPopularMoviesByPage(page);
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('upcoming')
  async getUpcomingMovies(): Promise<ListResponse<Movie>> {
    try {
      return this.moviesService.getUpcomingMovies();
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('discover')
  async getMovies(): Promise<ListResponse<Movie>> {
    try {
      return this.moviesService.getMovies();
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('trending')
  async getTrendingMovies(): Promise<ListResponse<Movie>> {
    try {
      return this.moviesService.getTrendingMovies();
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get(':id/providers')
  async getProviders(@Param('id') id: number): Promise<any> {
    try {
      return this.moviesService.getProvidersByMovieId(id);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: number): Promise<Movie> {
    try {
      return this.moviesService.getMovieDetailsById(id);
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
