export type UserSigninInformation = {
    email: string;
    password: string;
}

function validateUser(valuse: UserSigninInformation) {
    const errors = { // 나중에 에러 발생하면 여기에 에러 메시지를 넣어준다는 의미 
        email: "",
        password: "",
    };

    if ( // 이 로그인 유효성 검사에 테스트했을 때, values.email 값이 일치하지 않는다면 errors.email이 띄워지도록 한다는 것이다. 
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
            valuse.email,
        )
    ) {
        errors.email = "올바른 이메일 형식이 아닙니다!";
    }

    // 비밀번호 8자 20자 사이
    if (!(valuse.password.length >= 8 && valuse.password.length < 20)) {
        errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
    }

    return errors;
}

// 로그인 유효성 검사
function validateSignIn (values: UserSigninInformation) {
    return validateUser(values);
}

export { validateSignIn }; // 이렇게 하면 useForm에서 validate로 넘겨줄 값들을 만든 것이라고 보면 된다. 