
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const emailSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." })
});

const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다." }),

  password: z.string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
  .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),

  passwordCheck: z.string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
  .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),

  name: z.string()
  .min(1, { message: "닉네임을 입력해주세요." }),
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type EmailField = z.infer<typeof emailSchema>;
type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);
    console.log(response);
    navigate("/login");
  };

  return (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <div className="flex items-center justify-center w-[300px] mb-8 relative">
      <button 
        className="absolute left-4" 
        onClick={() => navigate(-1)}
        >
        &lt;
        </button>
        <h1 className="text-xl font-bold">회원가입</h1>
    </div>

    

    <div className="flex flex-col gap-3">
        <input
        {...register("email")}
        className={`border border-gray-300 w-[300px] rounded-md p-2
        ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="email"
        placeholder="이메일"
        />
        {errors?.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <input
        {...register("password")}
        className={`border border-gray-300 w-[300px] rounded-md p-2
            ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="password"
        placeholder="비밀번호"
        />
        {errors?.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

<input
        {...register("passwordCheck")}
        className={`border border-gray-300 w-[300px] rounded-md p-2
            ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="password"
        placeholder="비밀번호 확인"
        />
        {errors?.passwordCheck && (
          <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
        )}


        <input
        {...register("name")}
        className={`border border-gray-300 w-[300px] rounded-md p-2
            ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="name"
        placeholder="이름"
        />
        {errors?.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        <button 
        className="bg-blue-500 text-white w-[300px] rounded-md p-2 text-lg font-semibold 
        hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-gray-300"
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}>
        회원가입
        </button>
      </div>
  </div>
  )
};

export default SignupPage;