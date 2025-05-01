import { useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValues: T;
    validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>();

    const handleChange = (name: keyof T, text: string) => {
        setValues({ ...values, [name]: text, });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({ ...touched, [name]: true, });
    };

    
    const getInputProps = (name: keyof T) => {
        const value : T[keyof T] = values[name];
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            handleChange(name, e.target.value);
        };
        
        const onBlur = () => {
            handleBlur(name);
        };

    return {value, onChange, onBlur};
    };

   
    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return { values, errors, touched, getInputProps };
}

export default useForm;