export type UserSigninInformation = {
  email: string;
  password: string;
};

// 이메일, 패스워드 유효성 검사 실행 후 에러 반환하는 함수
function validateUser(values: UserSigninInformation) {
  const errors = { email: '', password: '' };

  const validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!validateEmail.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

// 로그인 유효성 검사 실행 함수
export function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}
