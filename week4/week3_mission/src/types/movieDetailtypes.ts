import { BaseMovie } from "./movie";

export type MovieDetail= BaseMovie&{
    belongs_to_collection:{
      id:number; name:string; poster_path:string; backdrop_path:string;
    };
    budget: number;
    genres: {
      id: number;
      name: string; 
    }[];
    homepage: string; 
    imdb_id: string; 
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string; 
    tagline: string; 
  }

export type linkResponse={
  id : number;
  results:
    {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  }
