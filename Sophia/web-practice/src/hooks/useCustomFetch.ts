import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { axiosClient } from '../apis/axiosClient';

function useCustomFetch<T>(url: string, options?: AxiosRequestConfig) {
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

export default useCustomFetch;
