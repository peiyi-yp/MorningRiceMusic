import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import axios from "axios";
import store from "./store";
import { Lazyload } from "vant";

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(router);
Vue.use(axios);
Vue.use(Lazyload);
new Vue({
  render: (h) => h(App),
  router,
  axios,
  store,
}).$mount("#app");
