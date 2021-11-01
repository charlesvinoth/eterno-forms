export default {
  install(Vue) {
    Vue.prototype.$session = {
      role() {
        return "ADMIN";
      },
    };
  },
};
