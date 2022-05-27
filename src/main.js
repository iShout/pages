import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import lodash from "lodash";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

Vue.use(ElementUI);

Vue.config.productionTip = false;

import "hover.css";
import "animate.css";
Vue.prototype.echarts = echarts;
Vue.prototype._ = lodash;
Vue.prototype.axios = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
