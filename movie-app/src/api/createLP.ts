import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;

type CreateLpParams = {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
};

export const createLp = async (params: CreateLpParams) => {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(`${BASE_URL}/v1/lps`, params, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
