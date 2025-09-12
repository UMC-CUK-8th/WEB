import { memo, useState } from 'react';
import { MovieFilters, MovieLanguage } from '../../types/movie';
import Input from './Input';
import SelectBox from './SelectBox';
import LanguageSelector from './LanguageSelector';
import { LANGUAGE_OPTIONS } from '../../constants/movie';

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

function MovieFilter({ onChange }: MovieFilterProps) {
  const [query, setQuery] = useState<string>('');
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>('ko-KR');

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };

    onChange(filters);
  };

  return (
    <div className='transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl'>
      <div className='flex flex-wrap gap-6'>
        <div className='min-w-[450px] flex-1'>
          <label className='mb-2 block text-sm font-medium text-gray-700'>영화 제목</label>
          <Input value={query} onChange={setQuery} />
        </div>
      </div>

      <div className='min-w-[250px] flex-1'>
        <label className='mb-2 block text-sm font-medium text-gray-700'>옵션</label>
        <SelectBox checked={includeAdult} onChange={setIncludeAdult} label='성인 컨텐츠 표시' id='include_adult' className='w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>

      <div className='min-w-[250px] flex-1'>
        <label className='mb-2 block text-sm font-medium text-gray-700'>언어</label>
        <LanguageSelector value={language} onChange={(value: string) => setLanguage(value as MovieLanguage)} options={LANGUAGE_OPTIONS} className='w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>

      <div className='pt-4'>
        <button onClick={handleSubmit}>영화 검색</button>
      </div>
    </div>
  );
}

// props가 변경되었을 때 값을 비교하여 리렌더링 여부 고려
export default memo(MovieFilter);
