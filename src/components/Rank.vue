<template>
    <div class="rank">
        <div v-for="(item, index) in list" :key="index" class="list" @click="getMvUrl(item.id)">
            <img :src="item.cover" width="40%">
            <div class="name">
                <p>{{ item.artistName }}</p>
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Rank',
    data() {
        return {

        }
    },
    methods: {
        getMvUrl(id) {
            this.$router.push({
                name: "MVDetail",
                params: {
                    id: id,
                },
            });
        }
    },
    computed: {
        list() {
            return this.$store.getters.getMVList
        }
    },
    created() {
        this.$store.dispatch('getTopMVAll', null)
    }
}
</script>
<style>
.list {
    display: flex;
    margin: 10px;
    /* align-items: center; */
}

.list img {
    border-radius: 10px;
}

.name {
    white-space: pre-wrap;
    text-align: left;
    padding-left: 20px;
}

.name p {
    color: #fff;
}

.name div {
    color: #fff;
    font-size: 14px;
}
</style>