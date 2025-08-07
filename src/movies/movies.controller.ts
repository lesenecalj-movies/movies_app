import {
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Categorie, Movie, TmdbVideoMovie } from './types/movies.type';
import { ListTmdbResponse } from './types/tmdb.type';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly logger: Logger,
  ) {}

  @Get('suggestions')
  getMoviesSuggested(
    @Query('userRequest') userRequest: string,
  ): Promise<Movie[]> {
    return this.moviesService.getSuggestedMovies(userRequest);
  }

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
  ): Promise<ListTmdbResponse<Movie>> {
    try {
      return this.moviesService.getPopularMoviesByPage(page);
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('upcoming')
  async getUpcomingMovies(): Promise<ListTmdbResponse<Movie>> {
    try {
      return this.moviesService.getUpcomingMovies();
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('discover')
  async getMovies(
    @Query('page') page: number,
    @Query('genres') genres?: number[],
    @Query('rate') rate?: number,
  ): Promise<ListTmdbResponse<Movie>> {
    try {
      return this.moviesService.getMovies(page, genres, rate);
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get('trending')
  async getTrendingMovies(): Promise<ListTmdbResponse<Movie>> {
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

  @Get(':id/trailer')
  async getTrailer(
    @Param('id') id: number,
  ): Promise<TmdbVideoMovie | undefined> {
    try {
      return this.moviesService.getTrailerMovie(id);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  @Get(':id')
  async getMovieDetails(
    @Param('id') id: string,
    @Query('external-source') externalSource?: 'imdb_id',
  ): Promise<Movie> {
    try {
      return this.moviesService.getMovieDetailsById(id, externalSource);
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
