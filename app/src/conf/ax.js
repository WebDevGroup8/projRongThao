import axios from "axios";
import { conf, api } from "@/conf/main";

export const axData = {
  jwt: null,
};

const ax = axios.create({
  baseURL: conf.apiUrlPrefix,
  withCredentials: true,
});

ax.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (axData.jwt && config.url !== api.auth.login) {
      config.headers["Authorization"] = `Bearer ${axData.jwt}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default ax;
