import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;

// 토큰 갱신 중인지 추적하는 플래그
let isRefreshing = false;
// 토큰 갱신 중 실패한 요청들을 저장하는 큐
let failedQueue: { resolve: Function; reject: Function }[] = [];

// 큐 처리 함수
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

// 요청 인터셉터: accessToken 자동 헤더 삽입
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("[요청 인터셉터] 요청 config:", config);
        return config;
    },
    (error) => {
        console.log("[요청 인터셉터] 에러:", error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        // 응답 로그
        console.log("[응답 인터셉터] 응답:", response);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // 401 에러 처리 (토큰 만료)
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("[응답 인터셉터] 401 에러 발생, 토큰 재발급 시도");
            
            // 이미 토큰 갱신 중이면 요청을 큐에 추가
            if (isRefreshing) {
                console.log("[응답 인터셉터] 토큰 갱신 이미 진행 중, 요청을 큐에 추가");
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then((token) => {
                    console.log("[응답 인터셉터] 큐에서 꺼낸 요청 재시도, 새 토큰:", token);
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => {
                    console.log("[응답 인터셉터] 큐 처리 중 에러:", err);
                    return Promise.reject(err);
                });
            }
            
            originalRequest._retry = true;
            isRefreshing = true;
            
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.log("[응답 인터셉터] refreshToken 없음, 로그아웃");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                //window.location.href = "/login";
                return Promise.reject(error);
            }
            
            try {
                // refreshToken으로 accessToken 재발급 요청
                console.log("[응답 인터셉터] refreshToken으로 토큰 재발급 요청 전송");
                const res = await axios.post(
                    `${BASE_URL}/v1/auth/refresh`,
                    { refresh: refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            
                console.log("[응답 인터셉터] 토큰 재발급 성공:", res.data);
                const newAccessToken = res.data.data.accessToken;
                const newRefreshToken = res.data.data.refreshToken;
                
                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);
                
                // 모든 후속 요청에 새 토큰 적용
                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                
                // 큐에 있는 요청들 처리
                processQueue(null, newAccessToken);
                
                // 원래 요청 재시도
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                console.log("[응답 인터셉터] 원래 요청 재시도:", originalRequest);
                return api(originalRequest);
            } catch (refreshError) {
                console.log("[응답 인터셉터] 토큰 재발급 실패:", refreshError);
                processQueue(refreshError, null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                //window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        console.log("[응답 인터셉터] 기타 에러:", error);
        return Promise.reject(error);
    }
);

export default api;
