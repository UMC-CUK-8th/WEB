import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { postSignup } from '../../apis/auth';
import { useState } from 'react';
import Email from '../../assets/Email.svg';
import OpenEye from '../../assets/open.svg';
import CloseEye from '../../assets/close.svg';

// zod schema 정의
const schema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }).max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
    passwordCheck: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }).max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  })
  // 모두 정의 후 추가 조건에 부합하는지 확인
  .refine((data) => data.password === data.passwordCheck, { message: '비밀번호가 일치하지 않습니다', path: ['passwordCheck'] });

// schema를 참고하여 타입 정의
type FormFields = z.infer<typeof schema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    // schema 전달
    resolver: zodResolver(schema),
    // isTouched 여부 확인
    mode: 'onBlur',
  });

  // 입력란 값 접근
  const email = watch('email');
  const password = watch('password');
  const passwordCheck = watch('passwordCheck');

  // 다음 버튼 활성화 조건
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  // 비밀번호 보이기/감추기
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordCheckHidden, setIsPasswordCheckHidden] = useState(true);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // passwordCheck를 제외한 데이터값 전달
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;

    try {
      const response = await postSignup(rest);
      console.log(response);

      alert('가입 성공!');
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('가입 실패..');
      // location.reload();
    }
  };

  return (
    <div className='h-full flex items-center justify-center bg-black px-4'>
      <div className='w-[320px] overflow-hidden'>
        <header className='text-white flex font-semibold text-xl py-4 relative justify-center'>
          <button type='button' className='absolute left-4 cursor-pointer' onClick={handleBack}>{`<`}</button>
          <h2>회원가입</h2>
        </header>

        <form className={`flex transition-transfoorm duration-300 ${isEmailChecked ? '-translate-x-[320px]' : ''} ${isPasswordChecked ? '-translate-x-[640px]' : ''}`}>
          {/* Step 1 - 이메일 */}
          <div className='flex flex-col gap-4 w-full shrink-0'>
            <input className={`border p-2 rounded-sm text-white bg-transparent ${errors?.email ? 'border-red-500' : 'border-[#ccc]'} focus:outline-none focus:border-blue-500`} type='email' placeholder='이메일' {...register('email')} />
            {errors?.email && <div className='text-red-500 text-sm'>{errors.email.message}</div>}

            <button type='button' className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-[#1f1e1e]' onClick={() => setIsEmailChecked(true)} disabled={!!errors.email || !email}>
              다음
            </button>
          </div>

          {/* Step 2 - 비밀번호 */}
          <div className='flex flex-col gap-4 w-full shrink-0'>
            <p className='text-white flex gap-2 pl-2'>
              <img src={Email} alt='이메일' />
              {email}
            </p>
            <div className='relative'>
              <input className={`w-full border p-2 rounded-sm text-white bg-transparent ${errors?.password ? 'border-red-500' : 'border-[#ccc]'} focus:outline-none focus:border-blue-500`} type={isPasswordHidden ? 'password' : 'text'} placeholder='비밀번호' {...register('password')} />
              <button type='button' className={`cursor-pointer absolute left-[90%] ${isPasswordHidden ? 'top-4' : 'top-2'}`} onClick={() => setIsPasswordHidden(!isPasswordHidden)}>
                {isPasswordHidden ? <img src={CloseEye} alt='보이기' /> : <img src={OpenEye} alt='감추기'></img>}
              </button>
            </div>
            {errors?.password && <div className='text-red-500 text-sm'>{errors.password.message}</div>}

            <div className='relative'>
              <input className={`w-full border p-2 rounded-sm text-white bg-transparent ${errors?.passwordCheck ? 'border-red-500' : 'border-[#ccc]'} focus:outline-none focus:border-blue-500`} type={isPasswordCheckHidden ? 'password' : 'text'} placeholder='비밀번호 확인' {...register('passwordCheck')} />
              <button type='button' className={`cursor-pointer absolute left-[90%] ${isPasswordCheckHidden ? 'top-4' : 'top-2'}`} onClick={() => setIsPasswordCheckHidden(!isPasswordCheckHidden)}>
                {isPasswordCheckHidden ? <img src={CloseEye} alt='보이기' /> : <img src={OpenEye} alt='감추기'></img>}
              </button>
            </div>
            {errors?.passwordCheck && <div className='text-red-500 text-sm'>{errors.passwordCheck.message}</div>}

            <button type='button' className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-[#1f1e1e]' disabled={!password || !passwordCheck || password !== passwordCheck} onClick={() => setIsPasswordChecked(true)}>
              다음
            </button>
          </div>

          {/* Step 3 - 이름 */}
          <div className='flex flex-col gap-4 w-full shrink-0 items-center'>
            <div className='rounded-full w-[100px] h-[100px] bg-gray-300'></div>
            <input className={`w-full border p-2 rounded-sm text-white bg-transparent ${errors?.name ? 'border-red-500' : 'border-[#ccc]'} focus:outline-none focus:border-blue-500`} type='text' placeholder='이름' {...register('name')} />
            {errors?.name && <div className='text-red-500 text-sm'>{errors.name.message}</div>}

            <button type='button' onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-[#1f1e1e]'>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
