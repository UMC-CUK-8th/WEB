import { useForm } from "react-hook-form";

type Props = {
  onNext: (email: string) => void;
};

const SignupEmailForm = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<{ email: string }>({
    mode: "onChange", // 실시간 유효성 반응
  });

  const onSubmit = (data: { email: string }) => {
    onNext(data.email);
  };

  return (
    <div className="flex flex-col items-center gap-4">

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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          placeholder="이메일"
          className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm`}
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-2 rounded-md font-semibold transition-colors
            ${!isValid || isSubmitting
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-700 cursor-pointer"}
          `}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default SignupEmailForm;
