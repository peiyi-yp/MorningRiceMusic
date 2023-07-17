export default {
  isSelect: false,
  reDisplay: true,
  reDisplays: true,
  isPlay: false, //当前是否有播放
  audioSrc: "", //音乐地址
  singerType: -1, //歌手标签
  sTypes: [
    { id: -1, name: "全部" },
    { id: 1, name: "男歌手" },
    { id: 2, name: "女歌手" },
    { id: 3, name: "乐队" },
  ],
  singerArea: -1, //歌手地区
  sArea: [
    { id: -1, name: "全部" },
    { id: 7, name: "华语" },
    { id: 96, name: "欧美" },
    { id: 8, name: "日本" },
    { id: 16, name: "韩国" },
    { id: 0, name: "其他" },
  ],
  current: { type: "slider", time: 0 }, //歌曲播放时间（number）
  duration: 0, //歌曲总时间（s）
  currentTime: "00:00", //当前时间（MM：ss）
  durationTime: "00:00", //歌曲总时间（MM：ss），
  songName: "", //当前歌曲名称
  songImg: "", //当前歌曲封面
  singer: "", //当前歌曲演唱
  songList: [], //当前歌曲列表
  songId: "", //当前音乐id,
  topSongList: [], //歌手热门歌曲
};
