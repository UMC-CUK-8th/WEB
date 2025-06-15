import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>영화 상세 페이지</h1>
      <h2>{id}번 영화 상세 페이지 패칭...</h2>
    </div>
  );
}
