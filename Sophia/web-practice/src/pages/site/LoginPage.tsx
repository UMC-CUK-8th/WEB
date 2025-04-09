import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../../utils/validate';

export default function LoginPage() {
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      // 초기값 설정
      email: '',
      password: '',
    },
    validate: validateSignin, // 로그인 유효성 검사 함수 전달
  });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  // 에러가 있거나 입력값이 비어있을 경우 버튼의 isDisabled === true
  const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || Object.values(values).some((value) => value === '');

  return (
    // 화면 전체에서 중앙 배치
    <div className='flex flex-col items-center justify-center h-full gap-4 '>
      <header className='text-white flex font-semibold text-xl py-4 relative'>
        <button type='button' className='absolute -left-24' onClick={handleBack}>{`<`}</button>
        <h2>로그인</h2>
      </header>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm text-white ${errors?.email && touched?.email ? 'border-red-500' : 'border-[#ccc]'}`} type='email' placeholder='이메일' {...getInputProps('email')} />
        {errors?.email && touched?.email && <div className='text-red-500 text-sm'>{errors.email}</div>}

        <input className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm text-white ${errors?.password && touched?.password ? 'border-red-500 ' : 'border-[#ccc]'}`} type='password' placeholder='비밀번호' {...getInputProps('password')} />
        {errors?.password && touched?.password && <div className='text-red-500 text-sm'>{errors.password}</div>}

        <button type='submit' disabled={isDisabled} className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-[#1f1e1e]'>
          로그인
        </button>
      </form>
    </div>
  );
}
