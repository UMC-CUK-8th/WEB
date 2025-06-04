interface ITextInput {
    onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {

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

export default TextInput;