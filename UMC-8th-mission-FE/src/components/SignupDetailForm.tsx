import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

type Props = {
  email: string;
  onNext: (data: { password: string }) => void;
};

const SignupDetailForm = ({ email, onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const isDisabled = !isValid || isSubmitting;

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    onNext({ password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center">
      <div className="text-white">✉️ {email}</div>

      <input
        {...register("password")}
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        className="border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
      />
      {errors.password && (
        <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}

      <input
        {...register("passwordCheck")}
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요!"
        className="border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
      />
      {errors.passwordCheck && (
        <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`w-[300px]  py-3 rounded-md text-lg font-semibold transition-colors
          ${isDisabled
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-pink-500 text-white hover:bg-pink-700 cursor-pointer"}
        `}
      >
        다음
      </button>
    </form>
  );
};

export default SignupDetailForm;
