import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Arial', 'Helvetica', 'sans-serif'],
      mono: ['Courier New', 'monospace'],
    },
    fontSize: {
      '10': '10px',
      '11': '11px',
      '12': '12px',
      '13': '13px',
      '14': '14px',
      '15': '15px',
      '16': '16px',
      'xs': '11px',
      'sm': '12px',
      'base': '13px',
      'lg': '14px',
      'xl': '15px',
      '2xl': '16px',
    },
    extend: {
      colors: {
        argus: {
          'navy': '#1a3a5c',        // Dark blue - headers, navbar
          'blue': '#2d6da3',        // Medium blue - section headers, active tabs
          'light': '#4a90d9',       // Light blue - buttons, links
          'orange': '#f5a623',      // Accent orange - warnings, highlights
          'bg': '#f0f4f8',          // Main background
          'bg-panel': '#ffffff',    // Panel background
          'bg-sidebar': '#2c4a6e',  // Sidebar background
          'bg-tab-active': '#ffffff',      // Active tab
          'bg-tab-inactive': '#d0dce8',    // Inactive tab
          'bg-row-alt': '#eef3f8',         // Alternate table row
          'border': '#b0c4d8',             // Border color
          'border-dark': '#7a9abb',       // Dark border
          'border-section': '#2d6da3',    // Section border
          'text-primary': '#1a1a1a',      // Primary text
          'text-header': '#ffffff',       // Header text (white)
          'text-link': '#2d6da3',         // Link text
          'text-label': '#333333',        // Form labels
          'text-muted': '#666666',        // Muted text
        },
        status: {
          'new': '#e8f4fd',
          'open': '#fff3cd',
          'review': '#d1ecf1',
          'closed': '#d4edda',
          'locked': '#f8d7da',
          'overdue': '#f8d7da',
        },
      },
      spacing: {
        128: '32rem',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
} satisfies Config;
