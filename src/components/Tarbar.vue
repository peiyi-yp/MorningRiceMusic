<template>
    <div>
        <component :is="active"></component>
        <van-tabbar v-model="active">
            <van-tabbar-item name="MyDiscover" icon="home-o">发现</van-tabbar-item>
            <van-tabbar-item name="MySinger" icon="search">歌手</van-tabbar-item>
            <van-tabbar-item name="friends" icon="friends-o">歌单</van-tabbar-item>
            <van-tabbar-item name="setting" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import MyDiscover from './Discover.vue'
import MySinger from './Singer.vue'
export default {
    name: 'MyTarbar',
    components: {
        MyDiscover,
        MySinger
    },
    data() {
        return {
            active: 'MyDiscover'
        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style scoped></style>