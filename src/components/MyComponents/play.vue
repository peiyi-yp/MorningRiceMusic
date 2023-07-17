<template>
    <div class="play">
        <div @click="toDetail"><img :src="songImg ? songImg : images" width="40px" height="40px"></div>
        <div class="song" v-if="songName">{{ songName }}</div>
        <div class="song" v-else>{{ desc }}</div>
        <div class="btn" @click.stop="changeStatus(isPlay)">
            <van-circle :value="rates" :rate="rates" color="#b6b6b6" :speed="100" :stroke-width="50" size="30px"
                layer-color="#ebedf0" />
            <img :src="isPlay ? pause : play" />
        </div>
        <audio :src="songSrc" ref="audio" @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate"
            @loadedmetadata="onLoadedmetadata" @playing="playing">
            <!-- <source :src="songSrc" type="audio/mpeg">
            <source :src="songSrc" type="audio/ogg"> -->
        </audio>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'play',
    props: {
        list: Array,
        fwidth: {
            type: Number,
            default: 0
        },
        fheight: {
            type: Number,
            default: 0
        },
        swidth: {
            type: Number,
            default: 50
        },
        sheight: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            current: 0, // 当前音乐播放进度（秒）
            duration: 0, // 音乐总时长（秒）
            play: require('../../assets/img/play.svg'),
            pause: require('../../assets/img/pause.svg'),
            images: require('../../assets/img/music.svg'),
            desc: '暂无播放'
        }
    },
    watch: {
        isPlay(news) {
            if (news) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
        },
        currents: {
            handler: function (news) {
                if (news.type == 'slider') {
                    const audio = this.$refs.audio;
                    audio.currentTime = Math.floor(news.time);
                }
            },
            deep: true
        },
        songId(newValue) {
            if (this.isSelect) {
                return
            } else {
                this.getSongUrl(newValue)
            }
        }
    },
    computed: {
        isPlay: {
            get() {
                return this.$store.state.isPlay;
            },
            set(newValue) {
                this.$store.commit('setIsPlay', { isPlay: newValue });
            }
            // return this.$store.getters.getIsPlay
        },
        songSrc() {
            return this.$store.getters.getAudioSrc
        },
        rates() {
            if (this.duration === 0) {
                return 0;
            }
            return (this.current / this.duration) * 100;
        },
        currentTime: {
            get() {
                return this.$store.state.currentTime;
            },
            set(newValue) {
                this.$store.commit('setCurrentTime', { currentTime: newValue });
            }
        },
        currents() {
            return this.$store.state.current
        },
        durationTime: {
            get() {
                return this.$store.state.durationTime;
            },
            set(newValue) {
                this.$store.commit('setDurationTime', { durationTime: newValue });
            }
        },
        songName: {
            get() {
                return this.$store.getters.getSongName;
            },
            set(newValue) {
                this.$store.commit('setSongName', { songName: newValue });
            }
        },
        songImg: {
            get() {
                return this.$store.getters.getSongImg;
            },
            set(newValue) {
                this.$store.commit('setSongImg', { songImg: newValue });
            }
        },
        songId() {
            return this.$store.getters.getSongId
        },
        isSelect() {
            return this.$store.getters.getIsSelect
        }
    },
    created() {

    },
    methods: {
        toDetail() {
            this.$router.push("/SongDetail")
        },
        changeStatus(newStatus) {
            if (!newStatus) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
            this.$store.commit('setIsPlay', { 'isPlay': !newStatus })
        },
        onPause() {
            this.isPlay = false
        },
        onPlay() {
            this.isPlay = true
        },
        onTimeupdate(e) {
            // console.log("时长变化", e)
            this.current = Math.floor(e.srcElement.currentTime)
            this.$store.commit('setCurrent', { current: { type: 'default', time: this.current } })
            const minutes = Math.floor(e.srcElement.currentTime / 60); // 计算分钟数
            const seconds = Math.floor(e.srcElement.currentTime % 60); // 计算剩余的秒数并四舍五入
            const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            // console.log(formattedDuration); // 输出格式化后的时长，例如：04:27
            this.currentTime = formattedDuration
        },
        onLoadedmetadata(e) {
            // console.log("音频文件加载", e)
            var timestamp = e.srcElement.duration;
            const minutes = Math.floor(timestamp / 60); // 计算分钟数
            const seconds = Math.floor(timestamp % 60); // 计算剩余的秒数并四舍五入
            const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            // console.log(formattedDuration); // 输出格式化后的时长，例如：04:27
            this.durationTime = formattedDuration
            this.current = e.srcElement.currentTime
            this.duration = Math.floor(timestamp);
            this.$store.commit('setCurrent', { current: { type: 'default', time: this.current } })
            this.$store.commit('setDuration', { duration: this.duration })
            // this.$store.commit('setIsPlay', { isPlay: true })
            if (this.isPlay) {
                const audio = this.$refs.audio;
                audio.currentTime = 0;
                this.$refs.audio.play()
            }
        },
        playing() {
            // console.log("缓冲文件", e)
        },
        getSongUrl(id) {
            this.$store.dispatch('getSongUrlByRecomand', id)
        },
    }
}
</script>

<style scoped>
.play {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100vw;
    height: 50px;
    line-height: 50px;
    /* border-radius: 10px; */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #FFDB26;
    /* background-color: rgb(182 182 182); */
    box-shadow: 0px -2px 2px 0px rgba(182, 182, 182, 0.5);
    display: flex;
    justify-content: space-around;
}

.play div:nth-child(1) {
    padding-top: 5px;
}


.play div:nth-child(1) img {
    border-radius: 10px;
}

.song {
    color: #fff;
}

.btn {
    position: relative;
    padding-top: 8px;
}

.btn img {
    position: absolute;
    top: 14px;
    left: 6px;
}
</style>