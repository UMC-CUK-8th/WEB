import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";

type Props = {
  email: string;
  password: string;
};

const SignupConfirmForm = ({ email, password }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    await postSignup({ email, password, name });
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center gap-4">

      <div className="w-24 h-24 rounded-full bg-gray-400" />

      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value.trim()) setError("");
        }}
        placeholder="이름을 입력해주세요"
        className="border border-[#333] w-[300px] p-[10px] bg-black text-white rounded-sm"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={!name.trim()}
        className={`w-[300px] py-3 rounded-md text-lg font-semibold transition-colors
          ${!name.trim()
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-pink-500 text-white hover:bg-pink-700 cursor-pointer"}
        `}
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default SignupConfirmForm;
