import { set } from 'react-hook-form';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; // 요청 재시도 여부
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 헤더에 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const accessToken = getItem();

        // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 시 refreshToken을 통해 accessToken을 갱신
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        // 401 에러 + 재시도 하지 않은 요청 처리
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            //refresg 엔드포인트 401 에러 발생 시(Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
            if (originalRequest.url === "/v1/auth/refresh") {
                const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            // 재시도 플래그 설정
            originalRequest._retry = true;

            // 이미 리프레시 요청이 진행 중인 경우, 그 Promise를 재사용
            if (!refreshPromise) {
                // refresh 요청 실행 후, Promise를 전역 변수에 할당
                refreshPromise = (async () => {
                    const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken();

                    const { data } = await axiosInstance.post(
                        "/v1/auth/refresh", {refresh: refreshToken}
                    );

                    // 새 토큰 반환
                    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    // 새 accessToken을 반환하여 다른 요청들이 사용할 수 있도록 함
                    return data.data.accessToken;
                })()
                .catch((error) => {
                    const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    removeAccessToken();
                    removeRefreshToken();
                })
                .finally(() => {
                    refreshPromise = null;
                });
            }

            // 진행 중인 refreshPromise가 resolve될 때까지 대기
            return refreshPromise.then((newAccessToken) => {
                // 원본 요청의 Authorization 헤더를 갱신된 accessToken으로 업데이트
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // 업데이트 된 원래 요청을 재시도
                return axiosInstance.request(originalRequest);
            });
        }
    },
);