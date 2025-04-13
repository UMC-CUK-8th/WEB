interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({ size = "md" }: LoadingSpinnerProps) => {
    const sizeClass =
        size === "sm" ? "w-5 h-5 border-2" :
        size === "lg" ? "w-12 h-12 border-4" :
        "w-8 h-8 border-3";

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className={`${sizeClass} border-purple-500 border-t-transparent rounded-full animate-spin`}></div>
        </div>
    )
}

export default LoadingSpinner;