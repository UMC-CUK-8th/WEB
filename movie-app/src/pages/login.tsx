import { FcGoogle } from "react-icons/fc";
import { IoChevronBack } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput";
import { useForm } from "../hooks/useForm";
import { login as loginAPI } from "../api/auth";
import LoadingSpinner from "../components/loading";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
    const {
        email,
        password,
        errors,
        isDisabled,
        handleChange,
        validate,
        touched,
        setTouched,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        setLoading(true);
        try {
            const data = await loginAPI(email, password);
            console.log("로그인 응답 data:", data);
            const accessToken = data.data.accessToken;
            const refreshToken = data.data.refreshToken;
            if (!accessToken || !refreshToken) {
                alert("서버에서 토큰을 반환하지 않았습니다.");
                return;
            }
            await authLogin(accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            alert("로그인에 성공했습니다!");
            navigate("/");
        } catch (err) {
            alert(
                (err as any)?.response?.data?.message || "로그인에 실패했습니다"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BE_URL}/v1/auth/google/login`;
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
            <div className="w-full max-w-xs flex items-center justify-center relative mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 text-white text-2xl mr-2 hover:text-purple-400 transition"
                >
                    <IoChevronBack />
                </button>
                <h1 className="text-xl font-bold">로그인</h1>
            </div>

            <button onClick={handleGoogleLogin} className="flex items-center justify-center w-full max-w-xs border border-purple-300 py-2 rounded mb-4 text-sm hover:bg-purple-300 hover:text-black transition">
                <FcGoogle className="text-lg mr-2" /> 구글 로그인
            </button>

            <div className="flex items-center w-full max-w-xs mb-4">
                <hr className="flex-grow border-gray-700" />
                <span className="mx-2 text-gray-400 text-sm">OR</span>
                <hr className="flex-grow border-gray-700" />
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xs space-y-3"
            >
                <FormInput
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해주세요!"
                    value={email}
                    onChange={handleChange}
                    onBlur={() => setTouched("email")}
                    error={touched.email ? errors.email : undefined}
                />

                <FormInput
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요!"
                    value={password}
                    onChange={handleChange}
                    onBlur={() => setTouched("password")}
                    error={touched.password ? errors.password : undefined}
                />

                {loading ? (
                    <div className="w-full flex justify-center py-4">
                        <LoadingSpinner size="sm" />
                    </div>
                ) : (
                    <button
                        type="submit"
                        className={`w-full py-2 rounded text-white text-sm transition ${
                        isDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-purple-400 hover:bg-purple-600"
                        }`}
                        disabled={isDisabled}
                    >
                        로그인
                    </button>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
