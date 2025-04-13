import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserSigninInformation, validateSignIn } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
    const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const navigate = useNavigate(); 

    const { values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initailValue: {
            email: "",
            password: "",
        },
        validate: validateSignIn,
    })

    const handleSubmit = async () => {
        console.log(values);
        try {
            const response = await postSignin(values);
            setItem(response.data.accessToken) // 액세스토큰이라는 키 이름으로 저장을 해주게 됨.
            
            navigate("/"); 
        } catch (error) {
            alert(errors?.message);
        }
    };

    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
        Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="relative w-[300px] h-10 mb-2">
                <button
                    onClick={() => navigate("/")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl"
                >
                    &lt;
                </button>
                <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold">
                    로그인
                </h2>
            </div>

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

            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'email'}
                    placeholder={"이메일"}  
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input 
                    {...getInputProps("password")}
                    name="password"
                    className={`border border-[#333} w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={'password'}
                    placeholder={"비밀번호"}  
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button type="button"
                    onClick={handleSubmit} 
                    disabled={isDisabled} 
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    로그인
                </button>
            </div>
        </div>
    )
}

export default Loginpage;