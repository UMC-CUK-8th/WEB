export type Movie = {
    adult:boolean;
    backdrop_path: string;
    genre_ids:number[];
    id:number;
    original_language:string;
    original_title: string;
    overview: string;
    popularity:number;
    poster_path: string;
    release_date: string;
    title: string; 
    video: boolean;
    vote_average:number;
    vote_count:number;

}

export type MovieResponse = {
    page: number;
    results:Movie[];
    total_pages:number;
    total_results:number;
};

export type MovieDetail = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
  };
  
  export type Cast = {
    cast_id: number;
    character: string;
    name: string;
    profile_path: string;
  };
  
  export type Crew = {
    credit_id: string;
    department: string;
    job: string;
    name: string;
  };
  
  export type Credits = {
    id: number;
    cast: Cast[];
    crew: Crew[];
  };
  