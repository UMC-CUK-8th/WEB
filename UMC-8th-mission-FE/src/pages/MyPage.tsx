import { useEffect, useState, useRef } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Settings, Check } from "lucide-react";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [ _data, setData] = useState<ResponseMyInfoDto>();
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [ _localAvatarFile, setLocalAvatarFile] = useState<File | null>(null); // 선택한 파일

  const updateMyInfoMutation = useUpdateMyInfo();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const response = await getMyInfo();
      setData(response);
      setName(response.data.name);
      setBio(response.data.bio || null);
      setAvatar(response.data.avatar || null);
    };
    fetchMyInfo();
  }, []);

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setLocalAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {

    updateMyInfoMutation.mutate(
      {
        name,
        bio,
        avatar, // 서버에 base64나 실제 URL을 보내야 함
      },
      {
        onSuccess: (updatedData) => {
          setData(updatedData);
          setEditMode(false);
          setLocalAvatarFile(null);
        },
        onError: () => {
          alert("수정에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="flex justify-center mt-16 text-white">
      <div className="bg-[#222222] p-8 rounded-2xl shadow-xl max-w-[460px] w-full relative">
        {!editMode ? (
          <Settings
            size={24}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setEditMode(true)}
          />
        ) : (
          <Check
            size={24}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleSave}
          />
        )}

        <div className="flex items-center space-x-6 mb-8 cursor-pointer" onClick={handleAvatarClick}>
          {avatar ? (
            <img
              src={avatar}
              alt="프로필 사진"
              className="w-28 h-28 rounded-full object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-bold">
              {name ? name[0] : "?"}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col flex-1 mr-4">
            {editMode ? (
              <>
                <input
                  type="text"
                  className="bg-[#333] rounded px-3 py-2 mb-2 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />
                <textarea
                  className="bg-[#333] rounded px-3 py-2 mb-2 text-white resize-none"
                  value={bio || ""}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="자기소개"
                  rows={3}
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-gray-300 mt-3 whitespace-pre-wrap">{bio}</p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-pink-600 rounded-xl hover:bg-pink-500 transition-colors font-semibold"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
