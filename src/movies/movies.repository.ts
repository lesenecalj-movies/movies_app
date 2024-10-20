import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';
import { Movie, PaginatedMovie } from "./types/movies.type";

@Injectable()
export class MoviesRepository {

  constructor(private readonly httpService: HttpService) { }

  async getPopularMoviesByPage(page: number) {
    const result = await firstValueFrom(
      this.httpService.get<PaginatedMovie>(`/movie/popular?page=${page}`)
    );
    return result.data;
  }

  async getMovieDetailsById(id: number): Promise<Movie> {
    const result = await firstValueFrom(
      this.httpService.get<Movie>(`/movie/${id}`)
    );
    return result.data;
  }
}