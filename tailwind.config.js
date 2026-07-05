/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        'primary-hover': '#1e293b',
        accent: '#3b82f6',
        'accent-hover': '#2563eb',
        muted: '#f8fafc',
        border: '#e2e8f0',
      },
    },
  },
  plugins: [],
}
