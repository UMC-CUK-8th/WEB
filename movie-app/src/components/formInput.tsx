import { forwardRef, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, placeholder, error, ...rest }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={`w-full px-4 py-2 rounded border text-sm bg-white text-black placeholder-gray-400
            ${error ? "border-red-500" : "border-gray-500"}`}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
      </div>
    );
  }
);

export default FormInput;