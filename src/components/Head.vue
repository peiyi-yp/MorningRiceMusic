<template>
    <div id="top_head">
        <div class="head">
            <div>
                <img :src="require('../assets/img/logo.svg')" />
            </div>
            <div class="title">
                晨米音乐</div>
            <div>
                <img :src="require('../assets/img/mine.svg')" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Head',
    data() {
        return {
            active: 0
        }
    },
    methods: {

    },
    created() {

    }
}
</script>
<style scoped>
@font-face {
    font-family: "阿里妈妈方圆体 VF Regular";
    src: url("../assets/font/AlimamaFangYuanTiVF-Thin.woff2") format("woff2"),
        url("../assets/font/AlimamaFangYuanTiVF-Thin.woff") format("woff"),
        url("../assets/font/AlimamaFangYuanTiVF-Thin.ttf") format("ttf");
    font-display: swap;
}

#top_head {
    width: 100vw;
    height: 40px;
}

.head {
    position: fixed;
    z-index: 9;
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(182, 182, 182);
}

.head div:nth-child(1) {
    margin-left: 10px
}

.head div:nth-child(3) {
    margin-right: 10px;
}

.title {
    line-height: 40px;
    font-size: 18px;
    color: #FFDB26;
    font-family: "阿里妈妈方圆体 VF Regular";
    font-weight: 700;
}
</style>