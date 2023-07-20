<template>
    <div class="songList">
        <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <van-sticky>
                <div class="singName">
                    <div @click="goBack"><img src="../assets/img/back.svg" width="26px"></div>
                    <div>{{ singerName }}</div>
                </div>
            </van-sticky>
            <div class="songBody">
                <div v-for="(item, index) in songList" :key="index" :class="{ 'highlighted': selectedItem === item.id }"
                    class="songItem" @click="getSongUrl(item.id)" @touchstart="handleTouchStart(item.id)"
                    @touchend="handleTouchEnd">
                    <div class="songIndex">{{ index + 1 }}</div>
                    <div style="width: 90%;">
                        <div class="songName">{{ item.name }}</div>
                        <div class="all">
                            <div class="songArt">{{ item.ar[0].name }}</div>
                            <div class="songDesc">{{ item.alia[0] }}</div>
                        </div>
                    </div>
                    <div class="videoPlay">
                        <img src="../assets/img/songListPlay.svg" width="20px">
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </v-touch>
    </div>
</template>

<script>
export default {
    name: 'SongList',
    data() {
        return {
            // songList: [],
            selectedItem: null
        }
    },
    computed: {
        singerId() {
            return this.$route.params.id
        },
        songList: {
            get() {
                return this.$store.getters.getSongList
            },
            set(newValue) {
                this.$store.commit('setSongList', { songList: newValue })
            }
        },
        singerName() {
            return this.$store.getters.getSinger
        },
        topSongList() {
            return this.$store.getters.getTopSongList
        }
    },
    methods: {
        swiperleft: function () {  //左划切换到goods页
            this.$router.push({ 'path': '/SongDetail' });
        },
        swiperright: function () { //右滑切换到detail页
            this.$router.go(-1)
        },
        getSongUrl(id) {
            this.$store.dispatch('getSongUrl', id)
        },
        handleTouchEnd() {
            this.selectedItem = null;
        },
        handleTouchStart(id) {
            this.selectedItem = id;
        },
        goBack() {
            this.$router.go(-1)
        },
    },
    created() {
    }
}
</script>
<style>
.songList {
    width: 100vw;
    height: 95vh;
    overflow-y: auto;
    overflow-x: hidden;
}

.songBody {
    width: 100%;
    height: 100%;
}

.songItem {
    position: relative;
    display: flex;
    justify-content: flex-start;
    height: 50px;
}

.songIndex {
    color: #eee;
    width: 10px;
    text-align: center;
    width: 5%;
}

.songArt {}

.songDesc {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 0;
    text-overflow: ellipsis;
    width: 190px;
}

.songItem>div:first-child {
    margin-left: 20px;
    margin-right: 20px;
}

.all {
    display: flex;
    align-items: center;
}

.all>div {
    color: #eee;
    font-size: 14px;
}

.songName {
    color: #fff;
    font-size: 18px;
    text-align: left;
    font-weight: 700;
    width: 80%;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
}

.videoPlay {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}

.highlighted {
    background-color: rgb(196 196 196 / 50%);
}

.singName {
    display: flex;
    width: 100%;
    background-color: rgb(201, 201, 201);
    height: 50px;
    line-height: 50px;
}

.singName div:first-child {
    width: 10%;
}

.singName div:last-child {
    width: 90%;
    text-align: center;
    letter-spacing: 5px;
    line-height: 50px;
}

.singName div {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 16px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
}

.singName img {
    margin-top: 12px;
}
</style>