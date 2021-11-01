import Cleave from "cleave.js";

export default {
  inserted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {});
  },
  update: (el) => {
    const event = new Event("input", { bubbles: true });
    setTimeout(function () {
      el.value = el.value ? el.cleave.properties.result : "";
      el.dispatchEvent(event);
    }, 100);
  },
};
