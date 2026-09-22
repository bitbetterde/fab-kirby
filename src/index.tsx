import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./templates/${name}.tsx`,
      import.meta.glob("./templates/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    // The server does not render the app (no Inertia SSR), so there is no
    // markup to hydrate. hydrateRoot would report a mismatch and fall back to
    // client rendering anyway.
    createRoot(el).render(<App {...props} />);
  },
});
