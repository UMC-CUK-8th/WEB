export type Movie = {
    adult: boolean; 
    backdrop_path: string;
    genre_ids: number[];
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
}

export type MovieResponse = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results:number
};

export type MovieDetailResponse = {
    title: string;
    release_date: string;
    runtime: number;
    overview: string;
    tagline: string;
    poster_path: string;
    vote_average: number;
    homepage: string;
    genres: { id: number; name: string }[];
    production_companies: { id: number; name: string }[];
    belongs_to_collection?: { name: string };
  }