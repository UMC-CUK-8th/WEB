import { memo, useState } from "react";
import type { MovieFilters, MovieLanguage } from "../types/movie"
import { Input } from "./Input";
import settingIcon from "../assets/images/Setting.png";
import languageIcon from "../assets/images/Language.png";
import { SelectBox } from "./SelectorBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");
  
  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white
    p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-md font-medium text-gray-700 flex items-center">
            <img 
              src={settingIcon}
              alt="설정"
              className="w-4 h-4 mr-[2px]"
            />
            옵션
          </label>
        </div>

        <SelectBox 
          checked={includeAdult}
          onChange={setIncludeAdult}
          label="성인 콘텐츠 표시"
          id="include_adult"
          className="w-full rounded-lg border border-gray-300 px-4 py-2
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 언어 선택 */}
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-mb font-medium text-gray-700 flex items-center">
            <img 
              src={languageIcon}
              alt="언어"
              className="w-4 h-4 mr-[2px]"
            />
            언어
          </label>
        </div>
        <LanguageSelector 
          value={language}
          onChange={setLanguage}
          options={LANGUAGE_OPTIONS}
          className="w-full rounded-lg border border-gray-300 px-4 py-2
          shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="pt-4">
          <button onClick={handleSubmit}>
            영화 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);