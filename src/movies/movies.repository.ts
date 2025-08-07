import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  Categorie,
  Movie,
  TmdbCategories,
  TmdbVideoMovie,
} from './types/movies.type';
import { ListTmdbResponse, TmdbResponse } from './types/tmdb.type';

@Injectable()
export class MoviesRepository {
  constructor(private readonly httpService: HttpService) {}

  async searchMovies(title: string): Promise<Movie[]> {
    const result: AxiosResponse<ListTmdbResponse<Movie>> = await firstValueFrom(
      this.httpService.get(`/search/movie?query=${title}`),
    );
    return result.data.results;
  }

  async getPopularMoviesByPage(page: number): Promise<ListTmdbResponse<Movie>> {
    const result: AxiosResponse<ListTmdbResponse<Movie>> = await firstValueFrom(
      this.httpService.get(`/movie/popular?page=${page}`),
    );
    return result.data;
  }

  async getMovieDetailsById(id: string): Promise<Movie> {
    const result: AxiosResponse<Movie> = await firstValueFrom(
      this.httpService.get<Movie>(`/movie/${id}`),
    );
    return result.data;
  }

  async getMovieFromExternalSource(
    id: string,
    externalSource: string,
  ): Promise<Movie> {
    const result: AxiosResponse<{ movie_results: Movie[] }> =
      await firstValueFrom(
        this.httpService.get<{ movie_results: Movie[] }>(
          `/find/${id}?external_source=${externalSource}`,
        ),
      );
    return result.data.movie_results[0];
  }

  async getProvidersByMovieId(id: number) {
    const result: AxiosResponse<Movie> = await firstValueFrom(
      this.httpService.get<Movie>(`/movie/${id}/watch/providers`),
    );
    return result.data;
  }

  async getVideosMovie(id: number): Promise<TmdbResponse<TmdbVideoMovie>> {
    const result: AxiosResponse<TmdbResponse<TmdbVideoMovie>> =
      await firstValueFrom(this.httpService.get(`movie/${id}/videos`));
    return result.data;
  }

  async getCategories(): Promise<Categorie[]> {
    const result: AxiosResponse<TmdbCategories> = await firstValueFrom(
      this.httpService.get('genre/movie/list'),
    );
    return result.data.genres;
  }

  async getMovies(
    page: number,
    genres?: number[],
    rate?: number,
  ): Promise<ListTmdbResponse<Movie>> {
    const withGenres = genres && genres.length > 0 ? genres : [];
    const voteAverageGte = rate ? rate / 10 : 0;

    const result: AxiosResponse<ListTmdbResponse<Movie>> = await firstValueFrom(
      this.httpService.get(
        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${withGenres}&vote_average.gte=${voteAverageGte}&sort_by=popularity.desc`,
      ),
    );
    return result.data;
  }

  async getTrendingMovies(): Promise<ListTmdbResponse<Movie>> {
    const result: AxiosResponse<ListTmdbResponse<Movie>> = await firstValueFrom(
      this.httpService.get('trending/movie/week'),
    );
    return result.data;
  }

  async getUpcomingMovies(): Promise<ListTmdbResponse<Movie>> {
    const result: AxiosResponse<ListTmdbResponse<Movie>> = await firstValueFrom(
      this.httpService.get('/movie/upcoming'),
    );
    return result.data;
  }
}
