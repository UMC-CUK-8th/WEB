import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}), // 여기에 직접 에러 메시지를 바로 띄울 수 있다.
    password: z
        .string()
        .min(8, {
            message: "비밀번호는 8자 이상이어야 합니다.",
        })
        .max(20, {
            message: "비밀번호는 20자 이하여야 합니다."
        }),
    passwordCheck: z
        .string()
        .min(8, {
            message: "비밀번호는 8자 이상이어야 합니다.",
        })
        .max(20, {
            message: "비밀번호는 20자 이하여야 합니다."
        }),
    name: z
        .string()
        .min(1, {message: "이름을 입력해주세요."})
})
.refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema> // 스키마의 타입들을 넣어주면 필드가 유추가 된다. 

const SignupPage = () => {
    const navigate = useNavigate();

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting}, 
    } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        // 스키마를 정의한 것에 대해서 위반하면 에러 메시지를 띄워주기 위해서 resolver를 사용한다.
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
      
          const response = await postSignup(rest);
          console.log(response);

          navigate("/login");
      };
      

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="relative w-[300px] h-10 mb-2">
                <button
                    onClick={() => navigate("/")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl"
                >
                    &lt;
                </button>
                <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold">
                    회원가입
                </h2>
            </div>

                <button className="w-[300px] flex items-center justify-center gap-2 border border-white rounded-sm py-2 hover:bg-white hover:text-black transition-colors">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    구글 로그인
                </button>
                <div className="flex items-center w-[300px] gap-5">
                    <div className="flex-1 h-px bg-white" />
                    <span className="text-gray-400 text-lg text-white">OR</span>
                    <div className="flex-1 h-px bg-white" />
                </div>

            <div className="flex flex-col gap-3">
                <input
                    {...register('email')}
                    name="email"
                    className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'email'}
                    placeholder={"이메일"}  
                />
                {errors.email && (
                    <div className={'text-red-500 text-sm'}>{errors.email.message}</div>
                )}

                <input 
                    {...register("password")}
                    name="password"
                    className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'password'}
                    placeholder={"비밀번호"}  
                />
                {errors.password && (
                    <div className={'text-red-500 text-sm'}>{errors.password.message}</div>
                )}

                <input 
                    {...register("passwordCheck")}
                    name="passwordCheck"
                    className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'password'}
                    placeholder={"비밀번호 확인"}  
                />
                {errors.password && (
                    <div className={'text-red-500 text-sm'}>{errors.password.message}</div>
                )}

                <input 
                    {...register("name")}
                    name="name"
                    className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'name'}
                    placeholder={"이름"}  
                />
                {errors.name && (
                    <div className={'text-red-500 text-sm'}>{errors.name.message}</div>
                )}

                <button
                    disabled={isSubmitting} 
                    type="button"
                    onClick={handleSubmit(onSubmit)} 
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    회원가입
                </button>
            </div>
        </div>
  )
}

export default SignupPage