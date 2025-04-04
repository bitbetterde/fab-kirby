import { writeFileSync } from "fs";
import * as CarbonIcons from "@carbon/icons-react";
import { PluginOption } from "vite";

export const generateIconOptions: PluginOption = {
  name: "build-icon-yaml",
  buildStart() {
    console.log("Building Icons Dropdown options from npm package.");

    writeFileSync(
      "./site/plugins/icon-dropdown/options.json",
      JSON.stringify(Object.keys(CarbonIcons)),
      "utf-8",
    );
  },
};
