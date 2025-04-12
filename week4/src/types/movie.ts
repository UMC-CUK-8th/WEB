export type BaseMovie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
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
export type Movie = BaseMovie & {
    genre_ids: number[];
    runtime: number;
    tagline: string;
  };
  type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  // export type MovieDetailResponse = BaseMovie & {
  //   belongs_to_collection: BelongsToCollection; 
  //   budget: number;
  //   // genres: Genre[]; 
  //   homepage: string;
  //   imdb_id: string;
  //   production_companies: { id: number; logo_path: string | null; name: string; origin_country: string }[];
  //   production_countries: { iso_3166_1: string; name: string }[];
  //   revenue: number;
  //   runtime: number;
  //   spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  //   status: string;
  //   tagline: string;

  // };
  
  export type MovieResponse = {
    page: number;
    results: Movie[]; // 실제로 들어오는거는 여러개의 영화 데이터니 Movie의 배열로 표현
    total_pages: number;
    total_results: number;
  };
