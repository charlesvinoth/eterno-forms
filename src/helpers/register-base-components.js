import { camelCase, upperFirst } from "lodash-es";

export const registerBaseComponents = (vm) => {
  try {
    // require base component context

    const requireComponent = require.context(
      "../components/base",
      true,
      /[\w-]+\.vue$/
    );

    requireComponent.keys().forEach((filePath) => {
      // get component config

      const componentConfig = requireComponent(filePath);

      // get filename from the filePath

      const fileName = filePath.split("/").slice(-1)[0];

      // remove file extension and convert component name to pascal case

      const componentName =
        "Base" + upperFirst(camelCase(fileName.replace(/\.\w+$/, "")));

      // register component globally

      vm.component(componentName, componentConfig.default || componentConfig);
    });
  } catch (err) {
    console.log("Base component registration failed");
    console.error(err);
  }
};
