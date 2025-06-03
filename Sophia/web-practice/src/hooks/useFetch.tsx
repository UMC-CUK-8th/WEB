import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { axiosClient } from '../apis/axiosClient';

// interface ApiResponse<T> {
//   data: T | null;
//   isPending: boolean;
//   isError: boolean;
// }

// type Language = 'en-US' | 'ko-KR';

// function useFetch<T>(url: string, language: Language = 'en-US'): ApiResponse<T> {
//   const [data, setData] = useState<T | null>(null);
//   const [isPending, setIsPending] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsPending(true);

//       try {
//         const { data } = await axios.get<T>(url, {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
//           },
//           params: {
//             language,
//           },
//         });
//         setData(data);
//       } catch {
//         setIsError(true);
//       } finally {
//         setIsPending(false);
//       }
//     };

//     fetchData();
//   }, [url, language]);

//   return { data, isPending, isError };
// }

function useFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // axios는 response.dat 형태로 들어오므로 구조 분해
        const { data } = await axiosClient.get(url, { ...options });

        setData(data);
      } catch {
        setError('failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
}

export default useFetch;
