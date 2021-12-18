import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, AuthCookie } from 'lib/cookies';
const validateSuccessStatus = (status: number): boolean => status >= 200 && status < 300;

const httpClient = axios.create({
  baseURL: process?.env?.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => validateSuccessStatus(status),
});

const get = async <T = unknown>(
  url: string,
  params?: unknown,
  config?: AxiosRequestConfig | undefined
): Promise<T> => {
  return await privateGet<T>(url, params, config, {});
};

const post = async <T = unknown>(url: string, payload: unknown): Promise<T> => {
  return await httpClient.post(url, payload).then((res) => res.data);
};

httpClient.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const accessToken = getCookie(AuthCookie.userId);
    if (accessToken) {
      if (req && req.headers) req.headers['user_id'] = accessToken;
    }
  }
  return req;
  window;
});

async function privateGet<T>(
  url: string,
  params?: unknown,
  config?: AxiosRequestConfig | undefined,
  headers?: unknown
): Promise<T> {
  config = {
    ...config,
    ...{
      headers,
    },
    ...{
      params,
    },
  };
  return await httpClient(url, config).then((res) => res.data);
}

export { httpClient, get, post };
