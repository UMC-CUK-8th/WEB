import api from "./axiosInstance";

export const likeLP = async (lpId: string | number) => {
    const res = await api.post(`/v1/lps/${lpId}/likes`);
    return res.data;
};

export const unlikeLP = async (lpId: string | number) => {
    const res = await api.delete(`/v1/lps/${lpId}/likes`);
    return res.data;
};
