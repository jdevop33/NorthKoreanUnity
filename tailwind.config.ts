// tailwind.config.ts
import type { Config } from 'tailwindcss'

// Basic Tailwind v4 config - Adapt theme/plugins as needed
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Include if using pages dir
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    // Add other paths that use Tailwind classes
  ],
  theme: {
    extend: {
      // Add custom theme extensions here based on your globals.css variables if desired
      // Example: Map CSS vars to Tailwind keys
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          // Add your custom color names if needed
          // These need corresponding CSS variable definitions in globals.css
          red: 'var(--color-primary-red)',
          blue: 'var(--color-primary-blue)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          // foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)', // Uncomment if needed
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
          // Add custom accent colors
          gold: 'var(--color-accent-gold)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        // Add other custom color names used in globals.css based on vars
        'warm-gray': 'var(--color-warm-gray)', 
        'warm-gray-dark': 'var(--color-warm-gray-dark)', 
        'text-light': 'var(--color-text-light)', 
        'text-primary': 'var(--color-text-primary)', 
        'text-secondary': 'var(--color-text-secondary)', 
        'content-bg-off': 'var(--color-content-bg-off)', 
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
         // Add shadcn animations if needed
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
         // Add shadcn animations if needed
         "accordion-down": "accordion-down 0.2s ease-out",
         "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-animate') // Add animate plugin if used
    // require('@tailwindcss/typography'), // Uncomment if using typography plugin classes
  ],
} satisfies Config;