export default {
  setIsSelect: (state, payload) => {
    state.isSelect = payload.isSelect;
  },
  setAudioSrc: (state, payload) => {
    state.audioSrc = payload.audioSrc;
  },
  setReDisplay: (state, payload) => {
    state.reDisplay = payload.reDisplay;
  },
  setReDisplays: (state, payload) => {
    state.reDisplays = payload.reDisplays;
  },
  setIsPlay: (state, payload) => {
    state.isPlay = payload.isPlay;
  },
  setSingerType: (state, payload) => {
    state.singerType = payload.singerType;
  },
  setSingerArea: (state, payload) => {
    state.singerArea = payload.singerArea;
  },
  setCurrentTime: (state, payload) => {
    state.currentTime = payload.currentTime;
  },
  setCurrent: (state, payload) => {
    state.current = payload.current;
  },
  setDurationTime: (state, payload) => {
    state.durationTime = payload.durationTime;
  },
  setDuration: (state, payload) => {
    state.duration = payload.duration;
  },
  setSongName: (state, payload) => {
    state.songName = payload.songName;
  },
  setSongImg: (state, payload) => {
    state.songImg = payload.songImg;
  },
  setSinger: (state, payload) => {
    state.singer = payload.singer;
  },
  setSongList: (state, payload) => {
    state.songList = payload.songList;
  },
  setSongId: (state, payload) => {
    state.songId = payload.songId;
  },
  setTopSongList: (state, payload) => {
    state.topSongList = payload.topSongList;
  },
};
