import Vue from 'vue';
import App from './App.vue';
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import axios from "axios";
import store from "./store";
import { Lazyload } from "vant";
import VueTouch from "vue-touch";

Vue.use(Vant);
Vue.use(router);
Vue.use(axios);
Vue.use(Lazyload);
Vue.use(VueTouch, { name: "v-touch" });
VueTouch.config.swipe = {
    threshold: 50, //设置左右滑动的距离
};
new Vue({
    render: (h) => h(App),
    router,
    axios,
    store,
}).$mount('#app');