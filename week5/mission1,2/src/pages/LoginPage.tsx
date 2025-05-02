import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import validateSignin, { UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
    const {login, accessToken} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);
    
    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async() => {
        await login(values);
    };

    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
    const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some(value => value === ""); // 입력값이 비어있으면 true

    return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex items-center justify-center w-[300px] mb-8 relative">
            <button 
            className="absolute left-4" 
            onClick={() => navigate(-1)}
            >
            &lt;
            </button>
            <h1 className="text-xl font-bold">로그인</h1>
        </div>

        <button 
        className="flex items-center justify-center gap-2 border border-gray-300 w-[300px] rounded-md p-2 mb-4
        hover:bg-blue-300 transition-colors cursor-pointer"
        type="button">구글 로그인</button>

        <div className="flex flex-col gap-3">
            <input
            {...getInputProps("email")}
            name="email"
            className={`border border-gray-300 w-[300px] rounded-md p-2
            ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type="email"
            placeholder="이메일"
            />
            {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>)}
            
            <input
            {...getInputProps("password")}
            name="password"
            className={`border border-gray-300 w-[300px] rounded-md p-2
                ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type="password"
            placeholder="비밀번호"
            />
            {errors?.password && touched?.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>)}

            <button 
            className="bg-blue-500 text-white w-[300px] rounded-md p-2 text-lg font-semibold 
            hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-gray-300"
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}>
            로그인
            </button>
        </div>
    </div>
    )
  }
  
  export default LoginPage;