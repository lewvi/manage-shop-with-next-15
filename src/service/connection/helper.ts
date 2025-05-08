import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchGetData = (path: string, params: any) => {
  return axios.get(`${API_URL}${path}`, { params: params });
};

const fetchPostData = (path: string, params: any) => {
  return axios.post(`${API_URL}${path}`, params || {});
};

const throwResponse = (err: any) => {
  throw {
    ...(err?.response ?? {
      ...err,
      message: err?.message ?? "Can't connect to server",
    }),
  };
};

export { fetchGetData, fetchPostData, throwResponse };
