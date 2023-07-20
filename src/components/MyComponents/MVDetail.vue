<template>
    <div class="rank">
        <video :src="src" :poster="images" width="100%" controls></video>
        <div class="mvdesc">{{ describetion }}</div>
    </div>
</template>

<script>
export default {
    name: 'MVDetail',
    data() {
        return {

        }
    },
    methods: {
        getMvUrl() {
            this.$store.dispatch('getMVDetail', this.mvid)
        },
    },
    computed: {
        mvid() {
            return this.$route.params.id
        },
        src() {
            return this.$store.getters.getMVSrc
        },
        images() {
            return this.$store.getters.getMvCover
        },
        describetion() {
            return this.$store.getters.getMvDesc
        }
    },
    created() {
        this.getMvUrl()
    }
}
</script>
<style>
.mvdesc {
    padding: 20px;
    color: #fff;
    line-height: 30px;
    letter-spacing: 2px;
}
</style>