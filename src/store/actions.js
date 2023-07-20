import { get } from "../api/axios";
export default {
  async getSongUrlByRecomand({ commit }, id) {
    try {
      commit("setSongId", { songId: id });
      const response = await get("/song/url?id=" + id, {});
      if (response.code == "200") {
        const url = response.data[0].url;
        commit("setAudioSrc", { audioSrc: url });
        // 调用其他相关的 action
        this.dispatch("getSongDetail", id);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getSongUrl({ commit }, id) {
    try {
      commit("setIsSelect", { isSelect: true });
      commit("setSongId", { songId: id });

      const response = await get("/song/url?id=" + id, {});
      if (response.code == "200") {
        const url = response.data[0].url;
        commit("setAudioSrc", { audioSrc: url });
        // 调用其他相关的 action
        this.dispatch("getSongDetail", id);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getSongDetail({ commit }, id) {
    try {
      const response = await get("/song/detail?ids=" + id, {});
      const song = response.songs[0];
      commit("setSongName", { songName: song.name });
      commit("setSongImg", { songImg: song.al.picUrl });
      commit("setSinger", { singer: song.ar[0].name });

      // 调用其他相关的 action
      this.dispatch("getSongWords", id);

      commit("setIsPlay", { isPlay: true });
    } catch (error) {
      console.error(error);
    }
  },
  async getSongWords({ commit }, id) {
    try {
      const response = await get("/lyric?id=" + id, {});

      console.log(response.lrc.lyric);
      commit("setLyric", { lyric: response.lrc.lyric });

      // 调用其他相关的 action
      this.dispatch("getSongWord_word", id);
    } catch (error) {
      console.error(error);
    }
  },
  async getSongsAll({ commit }, params) {
    try {
      commit("setSinger", { singer: params.name });
      const response = await get("/artist/songs?id=" + params.id, {});
      commit("setSongList", { songList: response.songs });
    } catch (error) {
      console.log(error);
    }
  },
  async getTopMVAll({ commit }, params) {
    try {
      console.log(params);
      const response = await get("/top/mv", {});
      commit("setMVList", { MVList: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  async getMVDetail({ commit }, params) {
    try {
      // console.log(params);
      const response = await get("/mv/detail?mvid=" + params, {});
      commit("setMvCover", { mvCover: response.data.cover });
      commit("setMvDesc", { mvDesc: response.data.desc });
      this.dispatch("getMVUrl", params);
    } catch (error) {
      console.log(error);
    }
  },
  async getMVUrl({ commit }, params) {
    try {
      const response = await get("/mv/url?id=" + params, {});
      commit("setMVSrc", { MVSrc: response.data.url });
    } catch (error) {
      console.log(error);
    }
  },
};
