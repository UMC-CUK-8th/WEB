import { memo } from "react";

interface ITextInput {
    onChange: (text: string) => void;
}

const TextInputMemo = ({ onChange }: ITextInput) => {
    console.log("TextInput rendered");

    return (
        <input
            type="text"
            onChange={(e) => {
                onChange(e.target.value);
            }}
            className="border p-4 rounded-lg"
        />
    );
};

export default memo(TextInputMemo);