import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoChevronBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput";
import { signup } from "../api/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "영문 대/소문자, 숫자를 포함해야 합니다."),
  confirm: z.string(),
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
}).refine((data) => data.password === data.confirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [, setLocalSignup] = useLocalStorage<FormData>("signupData", {
    email: "",
    password: "",
    confirm: "",
    nickname: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signup({ name: data.nickname, email: data.email, password: data.password });
      setLocalSignup(data);
      alert("회원가입 완료!");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      <div className="w-full max-w-xs flex items-center justify-center relative mb-6">
        <button
          onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
          className="absolute left-0 text-white text-2xl hover:text-purple-400 transition"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-xl font-bold">회원가입</h1>
      </div>

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            trigger("email").then((valid) => valid && setStep(2));
          }}
          className="w-full max-w-xs space-y-3"
        >
          <button
            type="button"
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_BE_URL}/v1/auth/google/login`;
            }}
            className="flex items-center justify-center w-full border border-purple-300 py-2 rounded mb-4 text-sm hover:bg-purple-300 hover:text-black transition"
          >
            <FcGoogle className="text-lg mr-2" /> 구글 로그인
          </button>

          <div className="flex items-center w-full mb-4">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <FormInput
            type="email"
            placeholder="이메일을 입력해주세요!"
            {...register("email")}
            error={errors.email?.message}
          />

          <button
            type="submit"
            className="w-full py-2 rounded text-white text-sm bg-purple-400 hover:bg-purple-600 transition"
          >
            다음
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            trigger(["password", "confirm"]).then((valid) => valid && setStep(3));
          }}
          className="w-full max-w-xs space-y-3"
        >
          <p className="text-sm text-gray-300">📧 {watch("email")}</p>

          <div className="relative">
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요!"
              {...register("password")}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <FormInput
              type={showConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              {...register("confirm")}
              error={errors.confirm?.message}
            />
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-600"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded text-white text-sm bg-purple-400 hover:bg-purple-600 transition"
          >
            다음
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs space-y-3 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white mb-4" />

          <FormInput
            type="text"
            placeholder="닉네임을 입력해주세요!"
            {...register("nickname")}
            error={errors.nickname?.message}
          />

          <button
            type="submit"
            className="w-full py-2 rounded text-white text-sm bg-purple-400 hover:bg-purple-500 transition"
          >
            회원가입 완료
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
