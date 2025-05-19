import { Search } from "lucide-react";

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
    return (
        <div className="flex justify-center mb-6 gap-2">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
                <Search className="w-5 h-5 text-gray-600" />
        </div>
    );
};

export default SearchBar;