import axios from "axios";
const BASE_URL = import.meta.env.VITE_BE_URL;

export const updateComment = async ({
    lpId,
    commentId,
    content,
}: {
    lpId: string;
    commentId: number;
    content: string;
}) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.patch(
        `${BASE_URL}/v1/lps/${lpId}/comments/${commentId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
};

export const deleteComment = async ({
    lpId,
    commentId,
}: {
    lpId: string;
    commentId: number;
}) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.delete(
        `${BASE_URL}/v1/lps/${lpId}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};
