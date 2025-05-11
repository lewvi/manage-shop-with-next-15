import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchGetData = (path: string, params: any) => {
  return axios.get(`${path}`, { params: params });
};

const fetchPostData = (path: string, params: any) => {
  return axios.post(`${path}`, params || {});
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
