import axios from "axios";

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:3000", // 设置接口的基础url
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在发送请求前对config做一些处理，比如添加token等
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理，比如解析数据等
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET请求
export function get(url, params) {
  return service.get(url, { params });
}

// POST请求
export function post(url, data) {
  return service.post(url, data);
}
