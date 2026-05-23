import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        serious: '#dc2626',
        warning: '#f97316',
        resolved: '#16a34a',
        info: '#0891b2',
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
