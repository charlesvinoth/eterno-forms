import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
  install(Vue) {
    Vue.prototype.$day = {
      format(isoDate, format = "YYYY/MM/DD") {
        return dayjs(isoDate).format(format);
      },

      new() {
        return dayjs().format("YYYY/MM/DD");
      },

      isValid(date) {
        return dayjs(date, "YYYY/MM/DD", true).isValid();
      },

      isDateGreater(minDate, maxDate) {
        return dayjs(minDate, "YYYY/MM/DD", true).isBefore(
          dayjs(maxDate, "YYYY/MM/DD", true)
        );
      },

      isTimeGreater(minTime, maxTime) {
        const date = this.new();

        return dayjs(`${date} ${minTime}`, "YYYY/MM/DD hh:mm A", true).isBefore(
          dayjs(`${date} ${maxTime}`, "YYYY/MM/DD hh:mm A", true)
        );
      },
    };
  },
};
