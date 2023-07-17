<template>
    <div class="singer">
        <div class="singer_one">
            <div class="singer_type">
                <div v-for="(item, index) in sTypes" :key="index" class="labels" :class="{ select: item.id == singerType }"
                    @click="typeChange(item.id)">
                    {{ item.name }}
                </div>
            </div>
            <div class="singer_area">
                <div v-for="(item, index) in sArea" :key="index" class="labels" :class="{ select: item.id == singerArea }"
                    @click="areaChange(item.id)">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="singer_list">
            <div v-for="(item, index) in singerList" :key="index" class="singer_list_item"
                @click="getSongsAll(item.id, item.name)">
                <div><img :src="item.picUrl" width="80px" height="80px" v-lazy="item.picUrl"></div>
                <div>{{ item.name }}</div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { get } from '../api/axios'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Singer',
    data() {
        return {
            singerList: []
        }
    },
    computed: {
        singerType() {
            return this.$store.getters.getSingerType
        },
        singerArea() {
            return this.$store.getters.getSingerArea
        },
        sTypes() {
            return this.$store.getters.getsType
        },
        sArea() {
            return this.$store.getters.getsArea
        }
    },
    methods: {
        handleIndexChange(e) {
            console.log(e)
        },
        po(e) {
            console.log(e)
        },
        getSingerById() {
            get('/artist/list?type=' + this.singerType + '&limit=50&area=' + this.singerArea + '&initial=0', {})
                .then(data => {
                    this.singerList = data.artists
                })
                .catch(error => {
                    console.error(error);
                });
        },
        typeChange(id) {
            this.$store.commit('setSingerType', {
                'singerType': id
            })
            this.getSingerById()
        },
        areaChange(id) {
            this.$store.commit('setSingerArea', {
                'singerArea': id
            })
            this.getSingerById()
        },
        getSongsAll(id, name) {
            const params = { id: id, name: name }
            this.$store.dispatch('getSongsAll', params)
            this.$router.push({
                name: "SongList",
                params: {
                    id: params.id,
                },
            });
        }
    },
    created() {
        this.getSingerById()
    }
}
</script>
<style>
.singer {
    width: 100vw;
    height: fit-content;
    margin-bottom: 50px;
}

.singer_one {
    width: 100%;
    margin-bottom: 10px;
}

.singer_type {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-around;
}

.singer_area {
    display: flex;
    justify-content: space-around;
}

.labels {
    width: 50px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    border: 1px solid #FFDB26;
    border-radius: 20px;
}

.select {
    background-color: #FFDB26;
}

.singer_list {
    width: 100%;
    height: auto;
    background-color: rgb(182 182 182);
}

.singer_list_item {
    display: flex;
    background-color: rgb(182 182 182);
}

.singer_list_item div:last-child {
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-left: 20px;
    line-height: 84px;
}
</style>