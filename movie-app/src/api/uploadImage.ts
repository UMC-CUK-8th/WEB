import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("accessToken");

    const response = await axios.post(`${BASE_URL}/v1/uploads`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data.imageUrl; // 업로드된 이미지 URL 반환
};
