import Vue from "vue";
import VueRouter from "vue-router";

const Recomand = (resolve) => {
  import("../components/Recomand.vue").then((module) => {
    resolve(module);
  });
};
const Singer = (resolve) => {
  import("../components/Singer.vue").then((module) => {
    resolve(module);
  });
};
const SongList = (resolve) => {
  import("../components/SongList.vue").then((module) => {
    resolve(module);
  });
};
const SongDetail = (resolve) => {
  import("../components/MyComponents/SongDetail.vue").then((module) => {
    resolve(module);
  });
};
const Rank = (resolve) => {
  import("../components/Rank.vue").then((module) => {
    resolve(module);
  });
};
const MVDetail = (resolve) => {
  import("../components/MyComponents/MVDetail.vue").then((module) => {
    resolve(module);
  });
};
const Search = (resolve) => {
  import("../components/Search.vue").then((module) => {
    resolve(module);
  });
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/Recomand",
    },
    {
      path: "/Recomand",
      component: Recomand,
    },
    {
      path: "/Rank",
      component: Rank,
    },
    {
      path: "/Singer",
      component: Singer,
    },
    {
      path: "/SongList/:id",
      name: "SongList",
      component: SongList,
    },
    {
      path: "/SongDetail",
      name: "SongDetail",
      component: SongDetail,
    },
    {
      path: "/Rank",
      name: "Rank",
      component: Rank,
    },
    {
      path: "/MVDetail/:id",
      name: "MVDetail",
      component: MVDetail,
    },
    {
      path: "/Search",
      name: "Search",
      component: Search,
    },
    // {
    //   path: "/search",
    //   component: Search,
    //   children: [
    //     {
    //       path: ":id",
    //       component: SingerDetail,
    //     },
    //   ],
    // },
    // {
    //   path: "/singer",
    //   component: Singer,
    //   children: [
    //     {
    //       path: ":id",
    //       component: SingerDetail,
    //     },
    //   ],
    // },
    // {
    //   path: "/user",
    //   component: UserCenter,
    // },
  ],
});
