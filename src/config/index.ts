export default () => ({
  tmdb: {
    token: process.env.TMDB_TOKEN,
    apiUrl: process.env.TMDB_API_URL,
  },
  groq: {
    token: process.env.GROQ_TOKEN,
    apiUrl: process.env.GROQ_API_URL,
  },
});
