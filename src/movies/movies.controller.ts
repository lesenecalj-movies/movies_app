import {
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Query,
  Sse,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ListResponse, Movie, Categorie } from './types/movies.type';
import { concatMap, delay, from, map, Observable, of } from 'rxjs';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly logger: Logger,
  ) {}

  @Sse('suggestions')
  getSuggestionsImdbIds(
    @Query('userRequest') userRequest: string,
  ): Observable<MessageEvent> {
    return from(this.moviesService.getSuggestedMovies(userRequest)).pipe(
      concatMap((movies) =>
        from(movies).pipe(
          concatMap((movie, index) =>
            of(movie).pipe(
              delay(150 * index),
              map((movie) => ({ data: movie }) as MessageEvent),
            ),
          ),
        ),
      ),
    );
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
  async getMovies(
    @Query('page') page: number,
    @Query('genres') genres?: number[],
    @Query('rate') rate?: number,
  ): Promise<ListResponse<Movie>> {
    try {
      return this.moviesService.getMovies(page, genres, rate);
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
