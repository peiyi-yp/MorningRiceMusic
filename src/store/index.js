import Vue from "vue";
import Vuex from "vuex";

//1.安装插件
Vue.use(Vuex);

import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

//2.创建对象
// const store = new Vuex.Store({
//   //单一状态树
//   state: {
//     counter: 1000,
//   },
//   //定义一些方法
//   mutations: {},
//   //提交mutation，可以包含异步操作
//   actions: {},
//   //状态获取
//   getters: {},
//   //将vuex进行分模块
//   modules: {},
// });

const store = new Vuex.Store({ state, actions, getters, mutations });

//3.导出使用
export default store;
