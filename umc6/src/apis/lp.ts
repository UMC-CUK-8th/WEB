import { PaginationDto } from "../types/common";
import { ResponseLpListDto, ResponseLpDetailDto } from "../types/lp";
import { axiosInstance } from "./axios";

// LP 리스트 조회
export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};

// LP 상세 조회
export const getLpDetail = async (lpId: string): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};


// import { PaginationDto } from "../types/common";
// import { ResponseLpListDto } from "../types/lp";
// import { axiosInstance } from "./axios";

// //LP 데이터 요청하는 쿼리 함수(getLpList)
// export const getLpList = async (paginationDto:PaginationDto):Promise<ResponseLpListDto> => {
//     const{data} = await axiosInstance.get("/v1/lps", {
//         params: paginationDto,
//     });

//     return data;
// };