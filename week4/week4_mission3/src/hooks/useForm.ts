import { ChangeEvent, useEffect, useState } from "react";

interface useFormProps<T> {
    initialValue:T; // {email:'',password:''}
    //값이 올바른 지 검증하는 함수. 
    validate:(value: T)=>Record<keyof T, string>;
}

function useForm<T>({initialValue,validate}:useFormProps<T>){
    const [values,setValues]=useState(initialValue); 

    const [touched, setTouched]=useState<Record<string,boolean>>();
    const [errors, setErrors]=useState<Record<string,string>>();

    //사용자가 입력값을 바꿀 때 실행되는 함수이다. 
    const handleChange = (name:keyof T, text: string)=>{
        setValues({
            ...values, //불변성 유지(기존 값 유지)
            [name]:text,
        });
    }; 
    
    //위랑 비슷 
    const handleBlur = (name:keyof T,)=>{
        setTouched({
            ...touched, // 이걸 만약 쓰지 않으면 email클릭 후 password 클릭 시 email 값이 사라짐
            [name]:true,
        });
    };  
    
    //이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것 
    const getInputProps=(name:keyof T)=>{
        const value=values[name];
        const onChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,)=>
            handleChange(name, e.target.value);
        const onBlur=()=>handleBlur(name);
        return {value, onChange,onBlur};
    }
    
    //values가 변경될 때 마다 에러 검증 로직이 실행 됨
    useEffect(()=>{
        const newErrors=validate(values);
        setErrors(newErrors); //오류 메세지 업데이트트
    },[validate,values]);

    return {values,errors,touched,getInputProps};
}

export default useForm;
