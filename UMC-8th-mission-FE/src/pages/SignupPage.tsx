import { useState } from "react";
import SignupEmailForm from "../components/SignupEmailForm";
import SignupDetailForm from "../components/SignupDetailForm";
import SignupConfirmForm from "../components/SignupConfirmForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDetailCompleted, setIsDetailCompleted] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (isDetailCompleted) {
      setIsDetailCompleted(false);
    } else if (email) {
      setEmail(""); // ← 이메일 입력 단계로 돌아감
    } else {
      navigate("/"); // 처음이라면 홈으로
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      {/* 공통 헤더 */}
      <div className="relative w-[300px] h-10">
        <button
          onClick={handleBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-xl"
        >
          &lt;
        </button>
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold">
          회원가입
        </h2>
      </div>

      {/* 본문 */}
      {!email ? (
        <SignupEmailForm onNext={setEmail} />
      ) : !isDetailCompleted ? (
        <SignupDetailForm
          email={email}
          onNext={(data) => {
            setPassword(data.password);
            setIsDetailCompleted(true);
          }}
        />
      ) : (
        <SignupConfirmForm email={email} password={password} />
      )}
    </div>
  );
};

export default SignupPage;
