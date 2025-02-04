import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

createInertiaApp({
  id: "root",
  resolve: (name) =>
    resolvePageComponent(
      `./templates/${name}.tsx`,
      import.meta.glob("./templates/**/*.tsx")
    ),
  setup({ el, App, props }) {
    const node = <App {...props} />;

    if (import.meta.env.DEV) {
      createRoot(el).render(node); // inertia doesn't support SSR in dev mode
    } else {
      hydrateRoot(el, node);
    }
  },
});
