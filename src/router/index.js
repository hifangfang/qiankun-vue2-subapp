import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);
//微应用页面路由
let appBaseRoutes = [
  {
    path: "/",
    component: (resolve) => require(["../App.vue"], resolve),
  },
];
const routes = [];

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// const activePath = process.env.NODE_ENV === "development" ? `/${systemEnName}/` : `/udaam-ui/${systemEnName}/`;

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `${process.env.VUE_APP_BASE_URL}` : "/",
  isAddAsyncMenuData: false,
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  let rotesData = store?.state?.routes?.routesData;
  if (!router.options.isAddAsyncMenuData) {
    if (rotesData?.length > 0) {
      //作为qiankun微应用运行 主应用下发了基础路由
      rotesData.forEach((element) => {
        let component = appBaseRoutes.filter((item) => item.path === element.path)[0]?.component;
        element.component = component;
        router.addRoute(element);
      });
    } else {
      //独立运行时 注册路由
      appBaseRoutes.forEach((element) => {
        router.addRoute(element);
      });
    }
    router.options.isAddAsyncMenuData = true;
    next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
  } else {
    router.options.isAddAsyncMenuData = true;
    next();
  }
});

export default router;
