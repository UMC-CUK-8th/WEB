import {z} from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useNavigate,} from "react-router-dom";
import BeforeIcon from "../assets/Before.svg";
import Google from "../assets/Google.svg";
import {postSignup} from "../apis/auth";
import { FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import defaultProfile from '../assets/defaultProfile.svg';
const schema = z.object({
  email: z.string().email({message:"올바른 이메일 형식이 아닙니다."}),
  password:z.string().min(8, {message:"비밀번호는 8자 이상이어야 합니다."}).max(20, {message: "비밀번호는 20자 이하이어야 합니다."}),
  passwordCheck:z.string().min(8, {message:"비밀번호는 8자 이상이어야 합니다."}).max(20, {message: "비밀번호는 20자 이하이어야 합니다."}),
  name: z.string().min(1, {message:"이름을 입력해주세요."}),
})
.refine((data) => data.password===data.passwordCheck,{
  message:"비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields =z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState:{errors, isSubmitting},  watch} = useForm<FormFields>({
    defaultValues: {
      email: "",  
      password: "",
      name: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode:"onBlur",
  });

  const email = watch('email');
  const password = watch('password');
  const passwordCheck = watch('passwordCheck');

  const [step, setStep] = useState(1);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordCheckHidden, setIsPasswordCheckHidden] = useState(true);

  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    const {passwordCheck, ...rest} = data;
    try{
      const response = await postSignup(rest);
      navigate("/login");
      console.log(response);
    }catch(error){
      alert('회원가입에 실패했습니다.');
      console.error(error);
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
    <div className="flex flex-col gap-3">
      <header className = "flex items-center  gap-18 mb-8">
        <img src={BeforeIcon} alt="before" className="w-[30px] h-[30px] cursor-pointer" onClick={() => navigate(-1)} />
        <p className="text-3xl font-bold text-[#D0C1FF]">회원가입</p>
      </header>
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
        {/* step1 이메일 입력 */}
        {step === 1 && (
          <>
          <div className={`flex border w-[300px] p-[10px] focus:border-[#807bff] rounded-lg text-white items-center gap-16 cursor-pointer`}>
          <img src={Google} alt="googleLogo" className={"w-[28px] h-[28px]"}/>구글 로그인
          </div>
          <div className="flex items-center w-[300px] gap-2 my-2">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-white text-sm">OR</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>
          <input 
          {...register("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#D0C1FF] rounded-sm text-white
            ${errors?.email ? "border-red-500" : "border-[#ccc]"}`} 
          type={"email"}
          placeholder={"이메일을 입력해주세요!"}
          />
          {errors?.email && ( <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
            <button type="button" onClick={()=>setStep(2)} disabled={!!errors.email || !email} className="w-full bg-[#D0C1FF] text-black py-3 rounded-md text-lg font-bold hover:bg-[#3f397c] transition-colors cursor-pointer disabled:bg-[#1f1e1e] disabled:text-white ">다음</button>
          </>
        )}
      {step === 2 && (
        <>
        <p className='text-white flex gap-2 pl-2 items-center'>
                <FiMail className='text-lg' />
                {email}
         </p>
         <div className='relative'>
         <input 
            {...register("password")}
            name="password"
            className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#D0C1FF] rounded-sm text-white
              ${errors?.password ? "border-red-500 " : "border-[#ccc]"}`} 
              type={isPasswordHidden ? "password" : "text"}
            placeholder={"비밀번호를 입력해주세요!"}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-white"
            onClick={() => setIsPasswordHidden((prev) => !prev)}>
              {isPasswordHidden ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
          {errors?.password && ( <div className="text-red-500 text-sm">{errors.password.message}</div>)}
         </div>
        <div className="relative">
        <input 
            {...register("passwordCheck")}
            name="passwordCheck"
            className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#D0C1FF] rounded-sm text-white
              ${errors?.passwordCheck ? "border-red-500 " : "border-[#ccc]"}`} 
              type={isPasswordCheckHidden ? "password" : "text"}
            placeholder={"비밀번호 확인!"}
            />
            <button
            type="button"
            className="absolute right-3 top-3 text-white"
            onClick={() => setIsPasswordCheckHidden((prev) => !prev)}
            >
            {isPasswordCheckHidden ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
            {errors?.passwordCheck && ( <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>)}
        </div>
        <button type="button" onClick={()=>setStep(3)} disabled={!password || !passwordCheck || password !== passwordCheck} className="w-full bg-[#D0C1FF] text-black py-3 rounded-md text-lg font-bold hover:bg-[#3f397c] transition-colors cursor-pointer disabled:bg-[#1f1e1e] disabled:text-white ">다음</button>
        </>
      )}
      
      {step === 3 && (
      <>
        <img src={defaultProfile} alt="profile" className="w-[160px] h-[160px] mx-auto" />
        <input 
        {...register("name")}
        name="name"
        className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#D0C1FF] rounded-sm text-white
          ${errors?.name ? "border-red-500" : "border-[#ccc]"}`} 
        type={"name"}
        placeholder={"이름을 입력해주세요!"}
        />
        {errors?.name && ( <div className="text-red-500 text-sm">{errors.name.message}</div>)}
        <button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full bg-[#D0C1FF] text-black py-3 rounded-md text-lg font-bold hover:bg-[#3f397c] transition-colors cursor-pointer disabled:bg-[#1f1e1e] disabled:text-white ">회원가입</button>
      </>
    )}
      </form>
    </div>
  </div>
  );
};

export default SignupPage;