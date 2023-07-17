<template>
    <div>
        <van-sticky>
            <div class="bgColor">
                <img :src="require('../assets/img/logo.svg')" />
                <van-search v-model="value" placeholder="请输入搜索关键词" />
                <img :src="require('../assets/img/mine.svg')" />
            </div>
        </van-sticky>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(img, index) in imgList" :key="index">
                <img :src="img.pic" width="100%" height="" />
            </van-swipe-item>
        </van-swipe>
        <SwiperMenu></SwiperMenu>
        <router-view></router-view>
    </div>
</template>

<script>
import { getBanner } from '../api/index'
import SwiperMenu from './SwiperMenu.vue'

export default {
    name: 'MyDiscover',
    comments: {
        SwiperMenu
    },
    data() {
        return {
            imgList: [],
            value: ''
        }
    },
    created() {
        getBanner().then(data => {
            this.imgList = data.data.banners
        }).catch(error => {
            console.log(error)
        })

    },
    methods: {

    }
}
</script>

<style scoped>
.bgColor {
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 6vh;
    line-height: 6vh;
    background-color: rgb(182 182 182);
}

.bgColor>>>.van-search {
    margin: 5px 0;
}

.my-swipe {
    /* border-radius: 5px; */
    margin: 5px;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    /* line-height: 150px; */
    text-align: center;
    /* background-color: #39a9ed; */
}
</style>