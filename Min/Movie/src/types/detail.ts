export type Genre = {
    id: number;
    name: string;
  };
  
  export type MovieDetail = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    runtime: number;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    genres: Genre[];
    tagline: string;
    homepage: string;
  };
  
  export type Cast = {
    cast_id: number;
    name: string;
    character: string;
    profile_path: string | null;
  };
  
  export type MovieDetailWithCredits = MovieDetail & {
    credits: {
      cast: Cast[];
    };
  };
  