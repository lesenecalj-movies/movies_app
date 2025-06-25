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

  async suggestMovieTitles(userRequest: string): Promise<string[]> {
    const systemPrompt = `
    Tu es un expert en recommandations de films. 
    Tu réponds toujours uniquement avec un objet JSON du format : { "titles": ["Film 1", "Film 2", "Film 3"] }
    Les films doivent correspondre exactement à la demande utilisateur : genre, période, style. 
    Ne retourne que des films connus et bien notés.
    Ne crée jamais de films inventés.
    `.trim();

    const userPrompt = `Donne-moi des films correspondant à cette demande : ${userRequest}`;

    try {
      const response = await firstValueFrom(
        this.groqHttp.post('/chat/completions', {
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userPrompt,
            },
          ],
          temperature: 0.9,
        }),
      );

      const content = response.data.choices?.[0]?.message?.content ?? '{}';
      const parsed = JSON.parse(content);

      if (!Array.isArray(parsed.titles)) {
        throw new Error('Unexpected format returned by Groq');
      }

      return parsed.titles;
    } catch (err) {
      console.error('Groq error:', err?.response?.data || err.message || err);
      throw new InternalServerErrorException('Échec de la suggestion de films');
    }
  }
}
