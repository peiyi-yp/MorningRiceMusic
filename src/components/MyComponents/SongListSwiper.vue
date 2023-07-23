<template>
    <div class="menus">
        <div v-for="(item, index) in list" :key="index" class="menu" @click="getList(item.id, item.name)">
            <div>
                <img v-if="item.img1v1Url" :src="item.img1v1Url"
                    :style="{ 'width': swidth + 'px', 'height': sheight + 'px' }" />
                <img v-else-if="item.iconUrl" :src="item.iconUrl"
                    :style="{ 'width': swidth + 'px', 'height': sheight + 'px' }" />
                <img v-else-if="item.coverImgUrl" :src="item.coverImgUrl"
                    :style="{ 'width': swidth + 'px', 'height': sheight + 'px' }" />
            </div>
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script>
import { get } from '../../api/axios'
export default {
    name: 'SongListSwiper',
    props: {
        type: {
            type: String,
            default: ''
        },
        list: Array,
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

        }
    },
    created() {

    },
    methods: {
        getList(id, name) {
            console.log(this.$props.type)
            switch (this.$props.type) {
                case 'songLists':
                    this.getSongLists(id, name)
                    break
                case 'singers':
                    this.getSingers(id, name)
                    break
            }
        },
        getSingers(id, name) {
            get('/artist/top/song?id=' + id, {})
                .then(data => {
                    // console.log(data)
                    this.$store.commit('setSinger', { singer: name })
                    this.$store.commit('setSongList', { songList: data.songs })
                    // this.$store.commit('setTopSongList', { topSongList: data.songs })
                    this.$router.push({
                        name: "SongList", params: {
                            id: id
                        }
                    })
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getSongLists(id, name) {
            this.$router.push({
                name: "SongList", params: {
                    id: id
                }
            })
            get('/playlist/track/all?id=' + id, {})
                .then(data => {
                    // console.log(data)
                    this.$store.commit('setSinger', { singer: name })
                    this.$store.commit('setSongList', { songList: data.songs })
                    // this.$store.commit('setTopSongList', { topSongList: data.songs })
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>

<style scoped>
.menus {
    width: 100vw;
    height: auto;
    white-space: nowrap;
    /* 防止列表项换行 */
    overflow-x: auto;
    display: flex;
    justify-content: space-between;
}

.menus::-webkit-scrollbar {
    width: 0;
    /* 指定滑动指示器的宽度 */
}

.menus .menu:nth-child(1) {
    margin-left: 5vw;
}

.menu {
    /* display: inline-block; */
    margin-right: 5vw;
}

.menu img {
    border-radius: 10px;
}

.menu p {
    width: 100%;
    font-size: 13px;
    margin: 0 0;
    white-space: break-spaces;
}
</style>