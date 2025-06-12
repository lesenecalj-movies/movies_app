import { Injectable } from '@nestjs/common';
import { GroqService } from 'src/external-api/groq/groq.service';
import { MoviesRepository } from './movies.repository';
import { Categorie, ListResponse, Movie } from './types/movies.type';

@Injectable()
export class MoviesService {
  groqApiKey: string;
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly groqService: GroqService,
  ) {}

  async getPopularMoviesByPage(page: number): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getPopularMoviesByPage(page);
  }

  async getMovieDetailsById(
    id: number,
    externalSource?: 'imdb_id',
  ): Promise<Movie> {
    if (externalSource) {
      return this.moviesRepository.getMovieFromExternalSource(
        id,
        externalSource,
      );
    } else {
      return this.moviesRepository.getMovieDetailsById(id);
    }
  }

  async getCategories(): Promise<Categorie[]> {
    return this.moviesRepository.getCategories();
  }

  async getProvidersByMovieId(movieId: number): Promise<any> {
    return this.moviesRepository.getProvidersByMovieId(movieId);
  }

  async getMovies(
    page: number,
    genres?: number[],
    rate?: number,
  ): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getMovies(page, genres, rate);
  }

  async getUpcomingMovies(): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getUpcomingMovies();
  }

  async getTrendingMovies(): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getTrendingMovies();
  }

  async getSuggestedImdbIds(): Promise<number[]> {
    return this.groqService.suggestMovieIds();
  }
}
