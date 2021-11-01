import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

import { capitalize } from "lodash-es";

export default {
  bind: (el, binding) => {
    if (!binding.value) return;

    let placement = Object.keys(binding.modifiers);
    placement = placement.length ? placement[0] : "auto";

    tippy(el, {
      content: capitalize(binding.value),
      theme: binding.arg || "dark",
      placement: placement,
      allowHTML: true,
    });
  },
};
