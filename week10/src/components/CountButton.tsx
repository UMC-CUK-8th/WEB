import { memo } from "react";

interface ICountButton {
    onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
    console.log("CountButton rendered");

    return (
        <button
            onClick={() => {
                onClick(10);
            }}
            className="border p-2 rounded-lg"
        >
            Generate Count
        </button>
    )
}

export default memo(CountButton);