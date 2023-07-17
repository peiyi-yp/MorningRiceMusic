<template>
    <div id="songDetail">
        <div class="back">
            <div @click="goBack"><img src="../../assets/img/back.svg" width="26px"></div>
            <div>{{ singerName }}/{{ songName }}</div>
            <!-- <div>/</div>
            <div>{{ songName }}</div> -->
        </div>
        <div class="animate">
            <div :class="{ disc: isPlaying }" class="discs">
                <img :src="songImg ? songImg : images" ref="images">
            </div>
        </div>
        <div class="controls_ico" style="margin-top: 15vh;">
            <div><img src="../../assets/img/love.svg"></div>
            <div><img src="../../assets/img/down.svg"></div>
            <div><img src="../../assets/img/sing.svg"></div>
            <div><img src="../../assets/img/comment.svg"></div>
            <div><img src="../../assets/img/more.svg"></div>
        </div>
        <div class="controls">
            <div class="controls_left">{{ currentTime }}</div>
            <div class="controls_middle">
                <van-slider :value="current" :max="duration" stroke-width="2px" button-size="8px" active-color="#FFDB26"
                    @change="onChange" class="controls_middle_slide" />
            </div>
            <div class="controls_right">{{ durationTime }}</div>
        </div>
        <div class="controls_ico">
            <div><img src="../../assets/img/random.svg"></div>
            <div @click="pre"><img src="../../assets/img/pre.svg"></div>
            <div @click="changeStatus"><img :src="isPlaying ? pauses : plays"></div>
            <div @click="next"><img src="../../assets/img/next.svg"></div>
            <div @click="getSongList"><img src="../../assets/img/list.svg"></div>
        </div>
        <div class="song_list" v-show="showList">
            <div v-for="(item, index) in songList" :key="index" @click="getSongUrl(item.id)">
                {{ item.name }}-{{ item.ar[0].name }}
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { get } from '../../api/axios'
export default {
    data() {
        return {
            value: 10,
            plays: require('../../assets/img/plays.svg'),
            pauses: require('../../assets/img/pauses.svg'),
            images: require('../../assets/img/music.svg'),
            showList: false
        }
    },
    computed: {
        isPlaying() {
            return this.$store.getters.getIsPlay
        },
        currentTime() {
            return this.$store.getters.getCurrentTime
        },
        current() {
            return this.$store.getters.getCurrent.time
        },
        durationTime() {
            return this.$store.getters.getDurationTime
        },
        duration() {
            return this.$store.getters.getDuration
        },
        singerName() {
            return this.$store.getters.getSinger
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
        songList() {
            return this.$store.getters.getSongList
        },
        songId() {
            return this.$store.getters.getSongId
        },
        topSongList() {
            return this.$store.getters.getTopSongList
        }
    },
    watch: {
        isPlaying(newStatus) {
            this.go(newStatus);
        }
    },
    mounted() {
        this.$nextTick(() => {
            var disc = document.getElementsByClassName('discs');
            if (this.isPlaying) {
                disc[0].children[0].style.animationPlayState = 'running';
            } else {
                disc[0].children[0].style.animationPlayState = 'paused';
            }
        })
    },
    created() {
        // this.$store.commit('setReDisplay', { reDisplay: false })
    },
    methods: {
        go(status) {
            this.$nextTick(() => {
                var disc = document.getElementsByClassName('discs');
                // console.log(disc[0].children[0].style.animationPlayState)
                if (status) {
                    disc[0].children[0].style.animationPlayState = 'running';
                    // this.$store.commit('setIsPlay', { isPlay: false })
                } else {
                    disc[0].children[0].style.animationPlayState = 'paused';
                    // this.$store.commit('setIsPlay', { isPlay: true })
                }
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        onChange(e) {
            console.log(e)
            this.$store.commit('setCurrent', { current: { type: 'slider', time: e } })
        },
        changeStatus() {
            this.$store.commit('setIsPlay', { isPlay: !this.isPlaying })
        },
        getSongList() {
            // console.log(this.songList, this.songId)
            this.showList = !this.showList
        },
        pre() {
            this.$store.commit('setIsSelect', { isSelect: false })
            this.songList.forEach((item, index) => {
                if (item.id == this.songId) {
                    if (index > 1) {
                        // this.$store.commit('setAudioSrc',{ audioSrc :this.songList[index+1].})
                        this.$store.commit('setSongId', { songId: this.songList[index - 1].id })
                    }
                }
            });
        },
        next() {
            this.$store.commit('setIsSelect', { isSelect: false })
            var indexs = null
            this.songList.forEach((item, index) => {
                if (item.id == this.songId) {
                    if (index < this.songList.length) {
                        console.log(item.id)
                        indexs = index
                    }
                }
            });
            // this.$store.commit('setAudioSrc',{ audioSrc :this.songList[index+1].})
            this.$store.commit('setSongId', { songId: this.songList[indexs + 1].id })
        },
        getSongUrl(id) {
            this.$store.dispatch('getSongUrl', id)
            // this.$store.commit('setIsSelect', { isSelect: true })
            // this.$store.commit('setSongId', { songId: id })
            // get('/song/url?id=' + id, {})
            //     .then(data => {
            //         console.log(data)
            //         if (data.code == '200') {
            //             var url = data.data[0].url
            //             this.$store.commit('setAudioSrc', { audioSrc: url })
            //             this.getSongDetail(id)
            //         }
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
        },
        getSongDetail(id) {
            get('/song/detail?ids=' + id, {})
                .then(data => {
                    console.log(data)
                    var song = data.songs[0]
                    this.$store.commit('setSongName', { songName: song.name })
                    this.$store.commit('setSongImg', { songImg: song.al.picUrl })
                    this.$store.commit('setSinger', { singer: song.ar[0].name })
                    this.getSongWords(id)
                    this.$store.commit('setIsPlay', { isPlay: true })
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getSongWords(id) {
            get('/lyric?id=' + id, {})
                .then(data => {
                    console.log(data.lrc.lyric)
                    this.getSongWord_word(id)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getSongWord_word(id) {
            get('/lyric/new?id=' + id, {})
                .then(data => {
                    console.log(data.lrc.lyric)
                })
                .catch(error => {
                    console.error(error);
                });
        },
    }
}
</script>

<style scoped>
#songDetail {
    width: 100vw;
    height: 87vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
}

.back {
    height: 50px;
    width: 100%;
    display: flex;
    /* padding: 10px; */
    text-align: left;
    background-color: rgb(201, 201, 201);
}

.back div:first-child {
    width: 10%;
    margin-top: 12px;
}

/* .back div:not(:first-child) {
    font-size: 16px;
    text-align: center;
    font-family: '微软雅黑';
    font-weight: 700;
    letter-spacing: 5px;
    line-height: 50px;
} */

.back div:last-child {
    width: 90%;
    font-size: 16px;
    text-align: center;
    font-family: '微软雅黑';
    font-weight: 700;
    letter-spacing: 5px;
    line-height: 50px;
}

.animate {
    width: 100%;
    height: auto;
    margin-top: 200px;
}

.discs {
    margin: 0 auto;
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-color: #c89a9a;
}

.discs img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    animation: rotate 10s linear infinite;
}

.disc img {
    /* animation: rotate 10s linear infinite; */
}

@keyframes rotate {
    0% {
        transform: translate(-50%, -50%) rotate(0);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.controls {
    display: flex;
    justify-content: space-around;
    height: 40px;
}

.controls_left {
    width: 10%;
    line-height: 40px;
    color: #FFDB26;
}

.controls_middle {
    position: relative;
    width: 60%;
    line-height: 40px;
}

.controls_middle_slide {
    /* position: absolute;
    top: 50%;
    left: 0; */
    transform: translateY(20px);
}

.controls_right {
    width: 10%;
    line-height: 40px;
    color: #FFDB26;
}

.controls_ico {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
}

.controls_ico img {
    width: 40px;
}

.song_list {
    width: 80vw;
    height: 34vh;
    overflow-y: auto;
    position: absolute;
    bottom: 12vh;
    right: 20px;
    z-index: 3;
    text-align: left;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 18px;
    background-color: #FFDB26;
    /* opacity: 0.8; */
}

.song_list div {
    margin: 30px 0;
}
</style>