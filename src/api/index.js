import api from "./api";

export const getBanner = () => api.get("banner?type=1");
export const getHomeMenu = () => api.get("/homepage/dragon/ball");
export const getHotSinger = () => api.get("/artist/list?type=1");
export const getPlayListHot = () => api.get("/top/playlist?limit=6&order=hot");
