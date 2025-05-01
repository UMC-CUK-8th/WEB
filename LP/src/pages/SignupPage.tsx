import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';



const schema = z.object({
    email:z.string().email({message:"올바른 이메일 형식이 아닙니다."}),
    password: z.string()
    .min(8,{
        message:"비밀번호는 8자 이상이어야 합니다.",
    }) 
    .max(20,{
        message:"비밀번호는 20자 이하여야 합니다.",
    }),
    passwordCheck:z.string(),
    name: z.string().min(1,{message:"이름을 입력해주세요."})
    }).refine((data)=>data.password===data.passwordCheck,{
        message:"비밀번호가 일치하지 않습니다. ",
        path:["passwordCheck"],
})


type FormFields = z.infer<typeof schema>;

const SignupPage=()=>{
    const {register, 
        handleSubmit, 
        getValues,  
        formState : {errors, isSubmitting}}
        =useForm<FormFields>({
        defaultValues:{
            name:"",
            email:"",
            password:"",
            passwordCheck:"",
        },
        resolver:zodResolver(schema),
            mode:"onBlur"
    });

    const onSubmit:SubmitHandler<FormFields>= async (data)=>{
        const {passwordCheck, ...rest}=data;

        const response = await postSignup(rest);
        console.log(rest);
        navigate("/login")
    };
    const navigate=useNavigate();
    console.log({isSubmitting});
    const [signupnext,useSignupnext] = useState(1);

    const [show1,setShow1]=useState(false);
    const [show2,setShow2]=useState(false);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white bg-black">
            <div className="flex flex-col gap-5">
            <div className="relative pb-3 text-3xl flex items-center justify-center">
                    <button type='button' className="absolute left-0 cursor-pointer" onClick={() => navigate(-1)}>
                        &lt;
                    </button>
                    <span>회원가입</span>
                </div>
                <button type='button' className="w-full text-white py-3 rounded-md text-lg font-medium border border-white cursor-pointer">
                    구글 로그인
                </button>
                <div className="flex items-center justify-between pt-2 pb-2">
                    <hr className="w-1/3"/>
                    OR
                    <hr className="w-1/3"/>
                </div>
        {signupnext===1 &&(<>
            <input 
            {...register("email")}
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-stone-900 
            ${errors?.email ? "border-pink-500":"border-gray-300"}`}
            type={"email"} 
            placeholder={"이메일을 입력해주세요!"}/>

            {errors.email && (<div className={`text-red-500 text-sm`}>{errors.email.message}</div>)}

            <button type='button' onClick={()=>useSignupnext(2)} disabled={!!errors.email||!getValues("email")} className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-500 transition-colors cursor-pointer disabled:bg-gray-300">
                다음
            </button>

        </>)}
        {signupnext==2 &&(<>
            <div>{getValues("email")}</div>
            <div className="relative w-full">
            <input 
            {...register("password")}
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-stone-900
            ${errors?.password ? "border-pink-500":"border-gray-300"}`}
            type={show1? "text":"password"} 
            placeholder={"비밀번호를 입력해주세요!"}/>
            <div
            className="absolute  top-1/2 -translate-y-1/2 right-2"
            onClick={() => setShow1(prev => !prev)}
            >
            {show1 ? <AiFillEyeInvisible size={25} /> : <AiFillEye size={25} />}
            </div>
            </div>
        {errors.password && (<div className={`text-red-500 text-sm`}>{errors.password.message}</div>)}
        
        <div className="relative w-full">
        <input 
            {...register("passwordCheck")}
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-stone-900 
            ${errors?.passwordCheck ? "border-pink-500":"border-gray-300"}`}
            type={show2? "text":"password"}  
            placeholder={"비밀번호를 다시 한번 입력해주세요"}/>
            <div
            className="absolute  top-1/2 -translate-y-1/2 right-2"
            onClick={() => setShow2(prev => !prev)}
            >
            {show2 ? <AiFillEyeInvisible size={25} /> : <AiFillEye size={25} />}
            </div>
            </div>
            {errors.passwordCheck && (<div className={`text-red-500 text-sm`}>{errors.passwordCheck.message}</div>)}  
            <button type='button' onClick={()=>useSignupnext(3)} disabled={!!errors.password||!!errors.passwordCheck||!getValues("password")||!getValues("passwordCheck")} className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-500 transition-colors cursor-pointer disabled:bg-gray-300">
                다음
            </button>
            {}
        </>)}
        {signupnext===3&&(<>
            <div className="flex justify-center">
            <div className="w-55 h-55 bg-white rounded-full"> </div>
            </div>
            <input 
            {...register("name")}
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-stone-900 
            ${errors?.name ? "border-pink-500":"border-gray-300"}`}
            type={"name"} 
            placeholder={"이름을 입력해주세요!"}/>
        {errors.name && (<div className={`text-red-500 text-sm`}>{errors.name.message}</div>)}  

        
        <button type='button' onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-500 transition-colors cursor-pointer disabled:bg-gray-300">
            회원가입 완료
        </button>
        </>


        )}
        
       

       
        </div>
        </div>
    )
}
export default SignupPage;