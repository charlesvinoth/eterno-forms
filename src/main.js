import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";

import "./styles/app.scss";

/* register base components */

import { registerBaseComponents } from "@/helpers/register-base-components";
registerBaseComponents(Vue);

/* ... */

/* register directives */

import "./directives/index";

/* ... */

/* register plugins */

import "./plugins/index";

/* ... */

/* signature pad */

import VueSignaturePad from "vue-signature-pad";
Vue.use(VueSignaturePad);

/* ... */

/* vuelidate */

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

/* ... */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
