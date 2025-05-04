import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignIn } from "../utils/validate";
import { useEffect } from "react";

const Loginpage = () => {
    const {login, accessToken} = useAuth();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [accessToken, navigate]);

    const { values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignIn,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(values);
        console.log("values:", values);
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }

    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) || 
        Object.values(values).some((value) => value === ""); 
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="relative w-[300px] h-10 mt-8 mb-2 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute left-0 text-white text-2xl"
                >
                    <img
                        src="/images/Back.svg"
                        alt="Back Button image"
                        className="w-5 h-5"
                    />
                </button>
                <h2 className="text-white text-xl font-semibold">로그인</h2>
            </div>

            <button 
                type="button"
                onClick={handleGoogleLogin} 
                disabled={isDisabled}
                className="w-[300px] flex items-center justify-center gap-4 border border-white rounded-sm py-2 hover:bg-[#FF3A8D] hover:text-black hover:border-none transition-colors">
                <img
                    src="/images/google.svg"
                    alt="google logo image"
                    className="w-5 h-5"
                />
                <span>구글 로그인</span>
            </button>

            <div className="flex items-center w-[300px] gap-5">
                <div className="flex-1 h-px bg-white" />
                <span className="text-gray-400 text-lg text-white">OR</span>
                <div className="flex-1 h-px bg-white" />
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#333] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'email'}
                    placeholder={"이메일"}  
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input 
                    {...getInputProps("password")}
                    name="password"
                    className={`border border-[#333] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'password'}
                    placeholder={"비밀번호"}  
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button type="submit"
                    disabled={isDisabled} 
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    로그인
                </button>
            </form>
        </div>
    )
}

export default Loginpage;