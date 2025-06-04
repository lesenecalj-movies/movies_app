import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GroqService {
  constructor(
    @Inject('GroqHttpService') private readonly groqHttp: HttpService,
  ) {}

  async suggestMovieIds(): Promise<number[]> {
    try {
      const response = await firstValueFrom(
        this.groqHttp.post('/chat/completions', {
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are a movie recommendation expert.',
            },
            {
              role: 'user',
              content:
                'Suggest 3 good movies to watch. Return only the IMDb IDs in a JSON array. No text before or after. Only the JSON array.',
            },
          ],
          temperature: 0.7,
        }),
      );

      const content = response.data.choices?.[0]?.message?.content ?? '';
      return JSON.parse(content);
    } catch (err) {
      console.error('Groq error:', err?.response?.data || err.message || err);
      throw new InternalServerErrorException(
        'Groq call failed or returned invalid JSON',
      );
    }
  }
}
