import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
    //
    initialValue: T; // { email: '', password: '' }
    // 올바른지 체크
    validate: (values: T) => Record<keyof T, string>; // T에 대한 키 값을 받고, 그것에 대한 value가 string이다라고 이해하면 된다. 
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>();

    // 사용자가 입력값을 바꿀 때 실행되는 함수다.
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, // 불변성 유지(기존 값 유지) // setValues는 기존 값 유지하고~~
            [name]: text, // name을 찾아서 텍스트를 넣어주면 된다 라고 생각하면 된다.
        });
    };

    // boolean에 따라서 블러 or not 블러
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        })
    };

    // 이메일, 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것
    const getInputProps = (name: keyof T) => {
        const value = values[name]; // 값을 받기
        const onChange = ( // 이 함수를 통해서 우리가 e.target.value를 가져와준다고 생각하면 된다.
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => handleChange(name, e.target.value);  

        // 바뀔 때, 블러 처리
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    // values가 변경될 때마다 에러 검증 로직이 실행됨.
    // { email: ""}
    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors); // 오류 메시지 업뎃
    }, [validate, values]); // validate, values가 바뀔 때마다 useEffect를 계속 실행되도록 할 것이다. 

    return { values, errors, touched, getInputProps };
}

export default useForm;