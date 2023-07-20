<template>
    <div class="search">
        <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <form action="/">
                <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
                    @input="onInput" />
            </form>
            <div v-for="(item, index) in list" :key="index" style="display: flex;align-items: center;">
                <img :src="item.iconUrl ? item.iconUrl : ulrs" width="40px">
                <span>{{ item.content }}</span>
            </div>
            <router-view></router-view>
        </v-touch>
    </div>
</template>

<script>
import { debounce } from '../utils/debounce'
import { Toast } from 'vant';
import { get } from '../api/axios'
export default {
    name: 'Search',
    data() {
        return {
            value: '',
            timer: null,//防抖定时器
            list: [],
            ulrs: require('../assets/img/poor.svg')
        }
    },
    computed: {
    },
    created() {
        this.getDefault().then((res) => {
            this.value = res.realkeyword
            this.getHotSearch()
        })
    },
    // watch: {
    //     value(val) {
    //         if (val) {
    //             this.myDebounce(this.getSugesstion(val), 3000)
    //         }
    //     }
    // },
    methods: {
        swiperleft: function () {  //左划切换到goods页
            // this.$router.push({ 'path': '/Search' });
        },
        swiperright: function () { //右滑切换到detail页
            this.$router.push({ 'path': '/Rank' });
        },
        onSearch(val) {
            // Toast(val);
            get('/cloudsearch?keywords=' + val, {})
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        onCancel() {
            Toast('已取消');
        },
        // onInput() {
        // if (this.timer !== null) {
        //     clearTimeout(this.timer)
        // }
        // this.timer = setTimeout(() => {
        //     console.log(value)
        //     this.timer = null
        // }, 500)
        // },
        onInput: debounce(function () {
            if (this.value) {
                get("/search/suggest?keywords=" + this.value, {})
                    .then((res) => {
                        console.log(res)
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        }, 1000),
        getSugesstion() {
            get("/search/suggest?keywords=" + this.value, {})
                .then((res) => {
                    console.log(res)
                }).catch((error) => {
                    console.log(error)
                })
        },
        getHotSearch() {
            get("/search/hot/detail", {})
                .then((res) => {
                    console.log(res)
                    this.list = res.data
                }).catch((error) => {
                    console.log(error)
                })
        },
        getDefault() {
            return new Promise((resolve, rejected) => {
                get("/search/default", {})
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }
    }
}
</script>
<style></style>