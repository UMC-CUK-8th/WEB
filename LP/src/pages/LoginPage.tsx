import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage=()=>{
    const {login,accessToken}=useAuth();
    const navigate=useNavigate();

    useEffect(()=>{
        if(accessToken){
            navigate('/')
        }
    },[navigate,accessToken]);


    const {values,errors,touched,getInputProps}=useForm<UserSigninInformation>({
        initialValue:{
            email:"",
            password:"",
        }, 
        validate:validateSignin,
    })
    const handleSubmit=async()=>{
      await login(values);
    };


    const handleGoogleLogin=()=>{

        window.location.href=import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login";
    };
    const isDisabled =
        Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "");

        
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white bg-black">
            <div className="flex flex-col gap-5">
                <div className="relative pb-3 text-3xl flex items-center justify-center">
                    <button type='button' className="absolute left-0 cursor-pointer" onClick={() => navigate(-1)}>
                        &lt;
                    </button>
                    <span>로그인</span>
                </div>
                <button type='button' onClick={handleGoogleLogin}  className="w-full text-white py-3 rounded-md text-lg font-medium border border-white cursor-pointer">
                    <div className="flex items-center justify-center gap-4">
                        
                        <span>구글 로그인</span>
                    </div>
                </button>
                <div className="flex items-center justify-between pt-2 pb-2">
                    <hr className="w-1/3"/>
                    OR
                    <hr className="w-1/3"/>
                </div>
                <input 
                    {...getInputProps("email")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus;border-[#807bff] rounded-sm bg-stone-900 
                        ${errors?.email && touched?.email ? "border-pink-500":"border-gray-300"}`}
                    type={"email"} 
                    placeholder={"이메일을 입력해주세요!"}/>

                {errors?.email && touched?.email &&(
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input 
                    {...getInputProps("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus;border-[#807bff] rounded-sm bg-stone-900
                        ${errors?.password && touched?.password ? "border-pink-500":"border-gray-300"}`}
                        type={"password"} 
                    placeholder={"비밀번호를 입력해주세요!"}/>
                {errors?.password && touched?.password &&(
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button type='button' onClick={handleSubmit} disabled={isDisabled} className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-500 transition-colors cursor-pointer disabled:bg-gray-300">
                    로그인
                </button>
            </div>
        </div>
    )
}
export default LoginPage;