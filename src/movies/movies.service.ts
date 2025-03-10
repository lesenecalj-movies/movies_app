import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { Movie, Categorie, ListResponse } from './types/movies.type';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async getPopularMoviesByPage(page: number): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getPopularMoviesByPage(page);
  }

  async getMovieDetailsById(id: number): Promise<Movie> {
    return this.moviesRepository.getMovieDetailsById(id);
  }

  async getCategories(): Promise<Categorie[]> {
    return this.moviesRepository.getCategories();
  }

  async getProvidersByMovieId(movieId: number): Promise<any> {
    return this.moviesRepository.getProvidersByMovieId(movieId);
  }

  async getMovies(): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getMovies();
  }

  async getUpcomingMovies(): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getUpcomingMovies();
  }

  async getTrendingMovies(): Promise<ListResponse<Movie>> {
    return this.moviesRepository.getTrendingMovies();
  }
}
