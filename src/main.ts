import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import InlineSvg from "vue-inline-svg";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false,
      },
    },
  },
  arrow: false,
});
Vue.component("tippy", TippyComponent);

Vue.component("inline-svg", InlineSvg);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
