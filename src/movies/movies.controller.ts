import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpException, Logger, Query } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: 1022789;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type PaginatedMovie = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {}

  @Get('popular')
  async getMovies(@Query('page') page: number = 1): Promise<PaginatedMovie> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PaginatedMovie>(`/movie/popular?page=${page}`)
      );
      return data;  
    } catch (error) {
      this.logger.error({error});
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
