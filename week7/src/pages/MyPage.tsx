import { useEffect, useState } from "react";
import { getMyInfo, patchMyInfo } from "../apis/auth";
import { ResponseMyInfoDTO } from "../types/auth";
import FloatingButton from "../components/FloatingButton";
import { SubmitHandler, useForm } from "react-hook-form";
import usePatchMyInfo from "../hooks/mutations/usePatchMyInfo";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

type FormFields = {
    name: string;
    bio: string;
};

const MyPage = () => {
    const { accessToken } = useAuth();
    const { data, isLoading } = useGetMyInfo(accessToken);
    const { register, handleSubmit, setValue } = useForm<FormFields>();
    const [isEditing, setIsEditing] = useState(false);

    const { mutate: infoMutate } = usePatchMyInfo();

    useEffect(() => {
        if (data?.data) {
            setValue("name", data.data.name);
            setValue("bio", data.data.bio ?? "");
        }
    }, [setValue]);

    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        const requestBody = { 
            ...formData, 
            avatar: data?.data.avatar ?? "" 
        };

        try {
            infoMutate(requestBody);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="relative bg-white p-20 rounded-lg shadow-lg mt-12 flex items-center space-x-5">
                <img
                    src={data?.data.avatar ?? ""}
                    alt="프로필 사진"
                    className="w-50 h-50 rounded-full border-1 border-gray-300"
                />
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
                    {isEditing ? (
                        <>
                            <input
                                {...register("name")}
                                className="border border-gray-300 w-[400px] rounded-md p-2 mb-2"
                            />
                            <input
                                {...register("bio")}
                                className="border border-gray-300 w-[400px] rounded-md p-2 mb-2"
                            />
                            <p className="text-md text-gray-700">{data?.data.email}</p>
                        </>
                    ) : (
                        <>
                            <h1 className="font-bold text-2xl text-gray-800 mt-[10px] mb-[10px]">
                                {data?.data.name}
                            </h1>
                            <p className="text-md text-gray-700">{data?.data.bio}</p>
                            <p className="text-md text-gray-700">{data?.data.email}</p>
                        </>
                    )}
                    <FloatingButton />
                </form>
                <div>
                    {isEditing ? (
                        <button 
                        className="bg-blue-500 text-white w-[70px] p-2 text-md rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                        type="submit" onClick={handleSubmit(onSubmit)}>
                            확인
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>
                            <img
                                src="/images/setting.png"
                                alt="설정 아이콘"
                                style={{ width: "30px", height: "30px" }}
                            />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyPage;