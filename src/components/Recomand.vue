<template>
    <div class="recomand">
        <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(img, index) in imgList" :key="index" @click="getBannerSong(img.song)">
                    <img :src="img.pic" width="100%" height="" />
                </van-swipe-item>
            </van-swipe>
            <SwiperMenu :list="list" :fwidth="80" :fheight="80"></SwiperMenu>
            <div>
                <h3 style="text-align: left;padding-left: 10px;">精品歌单<van-icon name="arrow" /></h3>
                <div style="margin-bottom: 10px;">
                    <SwiperMenu :type="songLists" :list="hotList" :fwidth="140" :fheight="140" :swidth="100" :sheight="100">
                    </SwiperMenu>
                </div>
            </div>
            <div>
                <h3 style="text-align: left;padding-left: 10px;">热门歌手<van-icon name="arrow" /></h3>
                <div>
                    <SwiperMenu :type="singers" :list="hotSinger" :fwidth="130" :fheight="130" :swidth="100" :sheight="100">
                    </SwiperMenu>
                </div>
            </div>
            <router-view></router-view>
        </v-touch>
    </div>
</template>

<script>
import { getBanner } from '../api/index'
import { getPlayListHot } from '../api/index'
import { getHomeMenu } from '../api/index'
import { get } from '../api/axios'
import SwiperMenu from './MyComponents/SwiperMenu'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Recomand',
    comments: {
        SwiperMenu
    },
    data() {
        return {
            list: [],
            imgList: [],
            hotList: [],
            hotSinger: [],
            songLists: 'songLists',
            singers: 'singers'
        }
    },
    methods: {
        swiperleft: function () {  //左划切换到goods页
            this.$router.push({ 'path': '/Singer' });
        },
        swiperright: function () { //右滑切换到detail页
            // this.$router.push({ 'path': '/Singer' });
        },
        selectList() {
            this.$router.push("/Singer")
        },
        getHotSingers() {
            get('/top/artists?offset=0&limit=5', {})
                .then(data => {
                    this.hotSinger = data.artists
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getBannerSong(song) {
            this.$store.dispatch('getSongUrl', song.id)
            this.$router.push("/SongDetail")
        },
    },
    created() {
        getBanner().then(data => {
            this.imgList = data.data.banners
        }).catch(error => {
            console.log(error)
        })
        getPlayListHot().then(data => {
            this.hotList = data.data.playlists
        }).catch(error => {
            console.log(error)
        })
        getHomeMenu().then(data => {
            this.list = data.data.data
        }).catch(error => {
            console.log(error)
        })
        this.getHotSingers()
    }
}
</script>
<style scoped>
.recomand {
    height: fit-content;
    margin-bottom: 50px;
}

.list {
    display: flex;
    margin-top: 10px;
    padding: 0 10px;
}
</style>