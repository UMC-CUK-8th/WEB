import { useState, useEffect } from "react";

export const useForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [touched, setTouchedState] = useState<{ email?: boolean; password?: boolean }>({});

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        newErrors.email = "올바른 이메일 형식이 아닙니다.";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        newErrors.password = "영어 대/소문자 및 숫자 조합 8자 이상 입력해주세요.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    }

    const setTouched = (field: "email" | "password") => {
        setTouchedState((prev) => ({ ...prev, [field]: true }));
    };

    useEffect(() => {
        validate();
    }, [email, password]);

    const isDisabled = !!errors.email || !!errors.password;

    return {
        email,
        password,
        errors,
        touched,
        setTouched,
        setEmail,
        setPassword,
        validate,
        handleChange,
        isDisabled,
    };
};
