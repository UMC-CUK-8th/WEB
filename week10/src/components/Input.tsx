interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const Input = ({
    value,
    onChange,
    placeholder = "검색어를 입력하세요.",
    className,
}: InputProps) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-md border-gray-500 p-3 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 ${className}`}
        />
    );
};

export default Input;