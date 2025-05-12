import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { BsChevronLeft } from "react-icons/bs";
import Google from "../assets/Google.svg";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  // accessToken과 refreshToken 각각 저장용 훅 사용
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

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
    console.log("입력 값:", values);
    try {
      const response = await postSignin(values);

      // ✅ 응답 전체 및 data 객체 콘솔 확인
      console.log("전체 응답:", response);
      console.log("응답 데이터:", response.data);

      // ✅ accessToken, refreshToken 저장
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-18 mb-8">
          <BsChevronLeft
            className="w-[25px] h-[25px] text-[#ac0576] cursor-pointer"
            style={{ strokeWidth: "1px" }}
            onClick={() => navigate(-1)}
          />
          <p className="text-3xl font-bold text-[#ac0576]">로그인</p>
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
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex border w-[300px] p-[10px] focus:border-[#ac0576] rounded-lg text-white items-center gap-16 cursor-pointer"
        >
          <img
            src={Google}
            alt="Google Logo Image"
            className="w-[28px] h-[28px]"
          />
          <span>구글 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

// import useForm from "../hooks/useForm";
// import { useNavigate } from "react-router-dom";
// import { UserSigninInformation, validateSignin } from "../utils/validate";
// import { BsChevronLeft } from "react-icons/bs";
// import Google from "../assets/Google.svg";
// import { postSignin } from "../apis/auth";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { LOCAL_STORAGE_KEY } from "../constants/key";

// const LoginPage = () => {
//   const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
//   const navigate = useNavigate();
//   const { values, errors, touched, getInputProps } =
//     useForm<UserSigninInformation>({
//       initialValue: {
//         email: "",
//         password: "",
//       },
//       validate: validateSignin,
//     });
//   const handleSubmit = async () => {
//     console.log(values);
//     try {
//       const response = await postSignin(values);
//       setItem(response.data.accessToken);
//       console.log(response);
//       navigate("/");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href =
//       import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
//   };

//   // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
//   const isDisabled =
//     Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면
//     Object.values(values).some((value) => value === ""); //입력값이 비어있으면

//   return (
//     <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
//       <div className="flex flex-col gap-3">
//         <div className="flex items-center gap-18 mb-8">
//           <BsChevronLeft
//             className="w-[25px] h-[25px] text-[#ac0576] cursor-pointer"
//             style={{ strokeWidth: "1px" }}
//             onClick={() => navigate(-1)}
//           />
//           <p className="text-3xl font-bold text-[#ac0576]">로그인</p>
//         </div>

//         <input
//           {...getInputProps("email")}
//           name="email"
//           className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#ac0576] rounded-sm text-white
//             ${
//               errors?.email && touched?.email
//                 ? "border-red-500"
//                 : "border-[#ccc]"
//             }`}
//           type={"email"}
//           placeholder={"이메일을 입력해주세요!"}
//         />
//         {errors?.email && touched?.email && (
//           <div className="text-red-500 text-sm">{errors.email}</div>
//         )}
//         <input
//           {...getInputProps("password")}
//           name="password"
//           className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#ac0576] rounded-sm text-white
//             ${
//               errors?.password && touched?.password
//                 ? "border-red-500 bg-red-200"
//                 : "border-[#ccc]"
//             }`}
//           type={"password"}
//           placeholder={"비밀번호를 입력해주세요!"}
//         />
//         {errors?.password && touched?.password && (
//           <div className="text-red-500 text-sm">{errors.password}</div>
//         )}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isDisabled}
//           className="w-full bg-[#ac0576] text-white py-3 rounded-md text-lg font-bold hover:bg-[#9a045f] transition-colors cursor-pointer disabled:bg-[#1f1e1e] disabled:text-white"
//         >
//           로그인
//         </button>
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="flex border w-[300px] p-[10px] focus:border-[#ac0576] rounded-lg text-white items-center gap-16 cursor-pointer"
//         >
//           <img
//             src={Google}
//             alt="Google Logo Image"
//             className="w-[28px] h-[28px]"
//           />
//           <span>구글 로그인</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
