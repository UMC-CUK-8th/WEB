import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;

export const postComment = async ({
    lpId,
    content,
}: {
    lpId: string;
    content: string;
}) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.post(
        `${BASE_URL}/v1/lps/${lpId}/comments`,
        { content },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
    return res.data.data;
};
