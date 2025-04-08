/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./site/templates/**/*.php"],
  theme: {
    fontFamily: {
      plex: ["var(--plex-font, 'IBM Plex Sans')", "sans-serif"],
      karla: ["var(--karla-font, 'Karla')", "sans-serif"],
      inter: ["var(--inter-font, 'Inter')", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        inner: 'repeat(13, minmax(0, 1fr))',
        outer: '1fr min(1536px, 100%) 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
