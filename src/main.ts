import "./qiankun/public-path";
import { lifeCycle, render } from "./qiankun/life-cycle";
debugger
/**
 * @name 统一注册插件
 */
import Vue from "vue";
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import validator from "validator";
Vue.prototype.$validator = validator;
import "./api/axios"
/**
 * @name 注册样式
 */


/**s
 * @name 导出微应用生命周期
 */
const { bootstrap, mount, unmount } = lifeCycle();
export { bootstrap, mount, unmount };
// 独立运行时

/**
 * @name 单独环境直接实例化vue
 */
const __qiankun__ :any= (window as any).__POWERED_BY_QIANKUN__;
__qiankun__ || render();
