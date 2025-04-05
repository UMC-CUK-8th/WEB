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
    runtime?: number;
    genres?: { id: number; name: string }[];
    production_countries?: { iso_3166_1: string; name: string }[];
};
  
export type MovieResponse = {
    page: number;
    results: Movie[]; 
    total_pages: number;
    total_results: number;
};