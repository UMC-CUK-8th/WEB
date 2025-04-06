export type MovieDetail={
    adult: boolean; // 성인 영화 여부
    backdrop_path: string | null; // 배경 이미지 경로
    belongs_to_collection: null | object; // 시리즈 소속 정보 (없을 수도 있음)
    budget: number; // 제작비 ($단위)
    genres: {
      id: number;
      name: string; // 장르 이름
    }[];
    homepage: string; // 공식 홈페이지 URL
    id: number; // 영화 ID
    imdb_id: string; // IMDb ID
    original_language: string; // 원어
    original_title: string; // 원제
    overview: string; // 줄거리 요약
    popularity: number; // 인기 지수
    poster_path: string | null; // 포스터 이미지 경로
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
    release_date: string; // 개봉일 (YYYY-MM-DD)
    revenue: number; // 수익 ($단위)
    runtime: number; // 러닝타임 (분)
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string; // 영화 상태 (예: Released)
    tagline: string; // 짧은 소개 문구
    title: string; // 제목
    video: boolean; // 비디오 전용 여부
    vote_average: number; // 평균 평점
    vote_count: number; // 투표 수
  }
  