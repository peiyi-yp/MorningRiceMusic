<template>
    <div class="tabar">
        <van-tabs v-model="active" swipeable background="#B6B6B6" color="#FFDB26" title-active-color="#FFF"
            :animated="true">
            <van-tab title="推荐" to="/Recomand"></van-tab>
            <van-tab title="歌手" to="/Singer"></van-tab>
            <van-tab title="MV排行" to="/Rank"></van-tab>
            <van-tab title="搜索" to="/Search"></van-tab>
        </van-tabs>
        <!-- <router-link tag="div" exact class="tab-item" :class="{ 'active': $route.path === '/Recomand' }" to="/Recomand">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" exact class="tab-item" :class="{ 'active': $route.path === '/Singer' }" to="/Singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" exact class="tab-item" :class="{ 'active': $route.path === '/Rank' }" to="/Rank">
            <span class="tab-link">排行
            </span>
        </router-link>
        <router-link tag="div" exact class="tab-item" :class="{ 'active': $route.path === '/Search' }" to="/Search">
            <span class="tab-link">搜索</span>
        </router-link> -->
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Tabar',
    data() {
        return {
            active: 0
        }
    }, methods: {

    },
    created() {

    }
}
</script>
<style>
.tabar {
    /* display: flex; */
    height: 44px;
    line-height: 44px;
    margin-bottom: 10px;
}

.tab-item {
    flex: 1;
    text-align: center;
}

.tab-link {
    padding-bottom: 5px;
    color: #fff;
}

.active span {
    color: #FFDB26;
}
</style>