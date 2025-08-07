import { Injectable } from '@nestjs/common';
import { GroqService } from 'src/external-api/groq/groq.service';
import { MoviesRepository } from './movies.repository';
import { Categorie, Movie, TmdbVideoMovie } from './types/movies.type';
import { ListTmdbResponse, TmdbResponse } from './types/tmdb.type';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly groqService: GroqService,
  ) {}

  async searchMovie(title: string): Promise<Movie | undefined> {
    const movies = await this.moviesRepository.searchMovies(title);
    if (!movies || movies.length === 0) {
      return;
    }
    movies.sort((a, b) => b.popularity - a.popularity);
    return movies[0];
  }

  async getPopularMoviesByPage(page: number): Promise<ListTmdbResponse<Movie>> {
    return this.moviesRepository.getPopularMoviesByPage(page);
  }

  async getMovieDetailsById(
    id: string,
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

  async getTrailerMovie(id: number): Promise<TmdbVideoMovie | undefined> {
    const videos: TmdbResponse<TmdbVideoMovie> =
      await this.moviesRepository.getVideosMovie(id);
    if (!videos || videos.results.length < 1) return;
    return videos.results.find(
      (video) => video.official === true && video.type === 'Trailer',
    );
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
  ): Promise<ListTmdbResponse<Movie>> {
    return this.moviesRepository.getMovies(page, genres, rate);
  }

  async getUpcomingMovies(): Promise<ListTmdbResponse<Movie>> {
    return this.moviesRepository.getUpcomingMovies();
  }

  async getTrendingMovies(): Promise<ListTmdbResponse<Movie>> {
    return this.moviesRepository.getTrendingMovies();
  }

  async getSuggestedMovies(userRequest: string): Promise<Movie[]> {
    const suggestedMovieTitles =
      await this.groqService.suggestMovieTitles(userRequest);

    if (!suggestedMovieTitles || suggestedMovieTitles.length === 0) {
      return [];
    }

    const moviesDetails = await Promise.all(
      suggestedMovieTitles
        .filter((item): item is NonNullable<typeof item> => item !== undefined)
        .map(async (movieTitle: string) => {
          const movie = await this.searchMovie(movieTitle);
          if (movie) {
            return this.getMovieDetailsById(`${movie.id}`);
          }
        }),
    );
    return moviesDetails as Movie[];
  }
}
