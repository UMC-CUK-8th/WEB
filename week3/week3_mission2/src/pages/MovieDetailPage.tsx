import { useParams } from "react-router-dom";

// home.tsx
const MovieDetailPage = () => {
    const {moviepage}=useParams();

    
    return (
    <div>
      <h1>🎬 영화 상세 페이지</h1>
      <p>영화 ID: {moviepage}</p>
    </div>    );
};

export default MovieDetailPage;