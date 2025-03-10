import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  Categorie,
  ListResponse,
  Movie,
  tmdbCategories,
} from './types/movies.type';

@Injectable()
export class MoviesRepository {
  constructor(private readonly httpService: HttpService) {}

  async getPopularMoviesByPage(page: number): Promise<ListResponse<Movie>> {
    const result: AxiosResponse<ListResponse<Movie>> = await firstValueFrom(
      this.httpService.get(`/movie/popular?page=${page}`),
    );
    return result.data;
  }

  async getMovieDetailsById(id: number): Promise<Movie> {
    const result: AxiosResponse<Movie> = await firstValueFrom(
      this.httpService.get<Movie>(`/movie/${id}`),
    );
    return result.data;
  }

  async getProvidersByMovieId(id: number) {
    const result: AxiosResponse<Movie> = await firstValueFrom(
      this.httpService.get<Movie>(`/movie/${id}/watch/providers`),
    );
    return result.data;
  }

  async getCategories(): Promise<Categorie[]> {
    const result: AxiosResponse<tmdbCategories> = await firstValueFrom(
      this.httpService.get('genre/movie/list'),
    );
    return result.data.genres;
  }

  async getMovies(): Promise<ListResponse<Movie>> {
    const result: AxiosResponse<ListResponse<Movie>> = await firstValueFrom(
      this.httpService.get('/discover/movie'),
    );
    return result.data;
  }

  async getTrendingMovies(): Promise<ListResponse<Movie>> {
    const result: AxiosResponse<ListResponse<Movie>> = await firstValueFrom(
      this.httpService.get('trending/movie/week'),
    );
    return result.data;
  }

  async getUpcomingMovies(): Promise<ListResponse<Movie>> {
    const result: AxiosResponse<ListResponse<Movie>> = await firstValueFrom(
      this.httpService.get('/movie/upcoming'),
    );
    return result.data;
  }
}
