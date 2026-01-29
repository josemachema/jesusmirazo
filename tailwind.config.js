/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#0A4A7A',
        'sandy-gold': '#E8B863',
        'sunset-coral': '#FF7E5F',
        'sky-azure': '#87CEEB',
        'white-sand': '#FDFBF7',
        'dark-navy': '#0D2F50',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        numbers: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
};
