import { ReponseUpdateLpDetailDto, RequestCreateLpDto, RequestUpdateLpDetailDto, ResponseCreateCommentDto, ResponseCreateLpDto, ResponseDeleteCommentDto, ResponseDeleteLp, ResponseLpCommentListDto, ResponseLpDetailDto, ResponseLpLikeDto, ResponseLpListDto, ResponseMyLpListDto, ResponseUpdateCommentDto } from '../types/lp';
import { PaginationDto } from './../types/common';
import { axiosInstance } from './axios';

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpId: number | undefined): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

export const getLpCommentList = async (paginationDto: PaginationDto, lpId: string | undefined): Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });

  return data;
};

export const postLike = async (lpId: number | null): Promise<ResponseLpLikeDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async (lpId: number | null): Promise<ResponseLpLikeDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};

export const createLp = async ({ title, content, thumbnail, tags, published }: RequestCreateLpDto): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post('/v1/lps', {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const deleteLp = async (lpId: number | null): Promise<ResponseDeleteLp> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);

  return data;
};

export const createComment = async ({ lpId, content }: { lpId: number | null; content: string }): Promise<ResponseCreateCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data;
};

export const deleteComment = async ({ lpId, commentId }: { lpId: number | null; commentId: number }): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);

  return data;
};

export const updateComment = async ({ lpId, commentId, content }: { lpId: number | null; commentId: number; content: string }): Promise<ResponseUpdateCommentDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
    content,
  });

  return data;
};

export const updateLpDetail = async ({ title, content, thumbnail, tags, published, lpId }: RequestUpdateLpDetailDto): Promise<ReponseUpdateLpDetailDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const getMyLpList = async (paginationDto: PaginationDto): Promise<ResponseMyLpListDto> => {
  const { data } = await axiosInstance(`/v1/lps/user`, {
    params: paginationDto,
  });

  return data;
};

export const updateMyInfo = async ({ name, bio, avatar }: { name: string; bio?: string; avatar?: string }) => {
  const { data } = await axiosInstance.patch('/v1/users', {
    name,
    bio,
    avatar,
  });

  return data;
};
