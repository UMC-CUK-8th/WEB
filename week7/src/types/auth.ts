import { CommonResponse } from "./common";

export type RequestSignupDTO = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
};

export type ResponseSignupDTO = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;

export type RequestSigninDTO = {
    email: string;
    password: string;
};

export type ResponseSigninDTO = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>;

export type ResponseMyInfoDTO = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;

export type RequestPatchMyInfoDTO = {
    name: string;
    bio?: string;
    avatar?: string;
};