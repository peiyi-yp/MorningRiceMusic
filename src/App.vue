<template>
  <div id="app">
    <transition name="slide" mode="out-in">

      <Head v-show="display"></Head>
    </transition>
    <transition name="slide" mode="out-in">
      <Tabar v-show="display"></Tabar>
    </transition>
    <KeepAlive>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </KeepAlive>
    <transition name="slide" mode="out-in">
      <Play v-show="display || displays"></Play>
    </transition>
  </div>
</template>

<script>
import Head from './components/Head.vue'
import Tabar from './components/Tabar.vue'
import Play from './components/MyComponents/play.vue'
export default {
  name: 'App',
  components: {
    Head,
    Tabar,
    Play
  },
  data() {
    return {

    }
  },
  watch: {
    $route(to) {
      // switch (to.path) {
      //   case '/Recomand':
      //     this.$store.commit('setReDisplay', { reDisplay: true })
      //     break
      //   case '/SongDetail':
      //     this.$store.commit('setReDisplay', { reDisplay: false })
      //     break
      //   case '/SongList':
      //     this.$store.commit('setReDisplay', { reDisplay: false })
      //     break
      // }
      if (to.path === '/Recomand' || to.path === '/Singer' || to.path === '/Rank' || to.path === '/Search') {
        this.$store.commit('setReDisplay', { reDisplay: true })
      } else if (to.path.includes('/SongList')) {
        this.$store.commit('setReDisplay', { reDisplay: false })
        this.$store.commit('setReDisplays', { reDisplays: true })
      } else if (to.path.includes('/MVDetail')) {
        this.$store.commit('setReDisplay', { reDisplay: false })
        this.$store.commit('setReDisplays', { reDisplays: false })
      } else {
        this.$store.commit('setReDisplay', { reDisplay: false })
      }
    },
  },
  computed: {
    display() {
      return this.$store.getters.getRedisplay
    },
    displays() {
      return this.$store.getters.getRedisplays
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-y: auto;
  background-color: rgb(182 182 182);
  /* margin-top: 60px; */
}

/* #app::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}

#app::-webkit-scrollbar-thumb {
  background-color: #ffdb26;
  border-radius: 8px;
}

#app::-webkit-scrollbar-thumb:hover {
  background-color: #ffdb26;
}

#app::-webkit-scrollbar-track {
  background-color: transparent;
}

#app::-webkit-scrollbar-track:hover {
  background-color: transparent;
} */

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
