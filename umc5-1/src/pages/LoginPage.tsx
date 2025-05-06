import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import BeforeIcon from "../assets/Before.svg";
import Google from "../assets/Google.svg";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin } from "../apis/auth";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면
    Object.values(values).some((value) => value === ""); //입력값이 비어있으면

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-18 mb-8">
          <img
            src={BeforeIcon}
            alt="before"
            className="w-[30px] h-[30px] cursor-pointer"
            style={{ fill: "#ac0576" }}
            onClick={() => navigate(-1)}
          />
          <p className="text-3xl font-bold text-[#ac0576]">로그인</p>
        </div>
        <div className="flex border w-[300px] p-[10px] focus:border-[#ac0576] rounded-lg text-white items-center gap-16 cursor-pointer">
          <img src={Google} alt="googleLogo" className={"w-[28px] h-[28px]"} />
          구글 로그인
        </div>
        <div className="flex items-center w-[300px] gap-2 my-2">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-white text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>
        <input
          {...getInputProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#ac0576] rounded-sm text-white
            ${
              errors?.email && touched?.email
                ? "border-red-500"
                : "border-[#ccc]"
            }`}
          type={"email"}
          placeholder={"이메일을 입력해주세요!"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#ac0576] rounded-sm text-white
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요!"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-[#ac0576] text-white py-3 rounded-md text-lg font-bold hover:bg-[#9a045f] transition-colors cursor-pointer disabled:bg-[#1f1e1e] disabled:text-white"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
