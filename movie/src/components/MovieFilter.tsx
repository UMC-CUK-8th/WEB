import {memo, useState } from "react";
import type { MovieFilters } from "../types/movie";
import Input from "./Input";
import SelectBox from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";


interface MovieFilterProps{
    onChange:(filter:MovieFilters)=> void;
}

const MovieFilter = ({onChange}: MovieFilterProps)=>{
    console.log("리렌더링, Movie Filter");
    const [query, setQuery] = useState<string>("");
    const [includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [language, setLanguage] = useState<MovieFilters["language"]>("ko-KR");

    const handleSubmit = ()=>{
        const filters : MovieFilters ={
            query,
            include_adult:includeAdult,
            language,
        };
        onChange(filters);
    };

    return (
        <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl mb-6 mt-6">
            <div className="flex flex-wrap gap-6">
                <div className="min-w-[450px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900">🎬영화 제목
                    </label>
                    <Input value={query} onChange={setQuery}/>
                </div>

                <div className="min-w-[250px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700"> ⚙옵션 </label>

                    <SelectBox checked={includeAdult} 
                    onChange={setIncludeAdult} 
                    label="성인 콘텐츠 표시" id="include_adult" className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-nonne focus:ring-2 focus:ring-blue-500"/>

                </div>
                <div className="min-w-[250px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        🌐언어
                    </label>
                    <LanguageSelector
                    value = {language}
                    onChange={setLanguage}
                    options ={LANGUAGE_OPTIONS}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-nonne focus:ring-2 focus:ring-blue-500" />

                </div>
                <div className="p-6 bg-blue-300 rounded-lg">
                <button onClick={handleSubmit}>🔎영화 검색</button>

                </div>

            </div>
        </div>
    )
};

export default memo(MovieFilter);