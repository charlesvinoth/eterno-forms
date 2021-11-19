export default {
  methods: {
    getFieldSize(fieldSize) {
      switch (fieldSize) {
        case "SMALL":
          return "col-3";
        case "MEDIUM":
          return "col-6";
        case "LARGE":
          return "col-12";
      }
    },

    getTitleStyle(field) {
      let titleSize = "";

      switch (field.titleSize) {
        case "SMALL":
          titleSize = "16px";
          break;
        case "MEDIUM":
          titleSize = "20px";
          break;
        case "LARGE":
          titleSize = "24px";
          break;
      }

      return {
        fontSize: titleSize,
        color: field.titleColor,
        fontWeight: 500,
      };
    },

    getDividerStyle(field) {
      return {
        borderBottomWidth: "1px",
        borderBottomColor:
          field.dividerStyle === "SOLID" ? "#e2e8f0" : "#cbd5e1",
        borderBottomStyle: field.dividerStyle,
        margin: "8px 0px",
      };
    },
  },
};
