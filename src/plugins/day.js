import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
  install(Vue) {
    Vue.prototype.$day = {
      format(isoDate, format = "DD MMM YYYY hh:mm A") {
        return dayjs(isoDate).format(format);
      },

      new() {
        return dayjs().format("YYYY/MM/DD");
      },
    };
  },
};
