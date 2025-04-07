// tailwind.config.ts
import type { Config } from 'tailwindcss'

// Corrected Tailwind v4 config - Align with globals.css :root variables
export default {
  darkMode: "class", // Enable class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Map colors to CSS variables defined in globals.css
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',       // From :root
        input: 'hsl(var(--input) / <alpha-value>)',        // From :root
        ring: 'hsl(var(--ring) / <alpha-value>)',          // From :root
        background: 'hsl(var(--background) / <alpha-value>)', // From :root
        foreground: 'hsl(var(--foreground) / <alpha-value>)', // From :root
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',       // From :root
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)', // From :root
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',     // From :root
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)', // From :root
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',   // From :root
          // foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)', 
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',         // From :root
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)', // From :root
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',         // From :root
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)', // From :root
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',       // From :root
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)', // From :root
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',         // From :root
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)', // From :root
        },
        // Colors for specific named elements (assuming vars exist in globals.css)
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar) / <alpha-value>)',       // From :root
          foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)', // From :root
          primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',       // From :root
          primaryForeground: 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)', // From :root
          accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',         // From :root
          accentForeground: 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)', // From :root
          border: 'hsl(var(--sidebar-border) / <alpha-value>)',       // From :root
          ring: 'hsl(var(--sidebar-ring) / <alpha-value>)',         // From :root
        },
         // Chart colors
        chart: {
          '1': 'hsl(var(--chart-1) / <alpha-value>)', // From :root
          '2': 'hsl(var(--chart-2) / <alpha-value>)', // From :root
          '3': 'hsl(var(--chart-3) / <alpha-value>)', // From :root
          '4': 'hsl(var(--chart-4) / <alpha-value>)', // From :root
          '5': 'hsl(var(--chart-5) / <alpha-value>)', // From :root
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        'sans-kr': ['var(--font-sans-kr)', 'sans-serif'],
        'serif-kr': ['var(--font-serif-kr)', 'serif'],
      },
      keyframes: {
         fadeIn: { 
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
         },
         slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
         },
         "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
         },
         "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
         },
      },
      animation: {
         fadeIn: 'fadeIn 1s ease-in-out forwards',
         slideUp: 'slideUp 0.6s ease-out forwards',
         "accordion-down": "accordion-down 0.2s ease-out",
         "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-animate') 
    // require('@tailwindcss/typography'), 
  ],
} satisfies Config;