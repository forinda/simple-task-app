/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{jsx,tsx,vue,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibm-mono': ["IBM Plex Mono", 'monospace']
      }
    },
  },
  plugins: [import('@tailwindcss/forms')],
}

