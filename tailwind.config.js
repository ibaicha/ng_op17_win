
const colors = require('tailwindcss/colors')

module.exports = {
    prefix: '',
    corePlugins: {
        preflight: false,
     },

        content: [
            './src/**/*.{html,ts}',
        ],

    darkMode: 'class', // or 'media' or 'class'
    theme: {
        // Some useful comment
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        extend: {
            fontFamily: {
                'nunito': ['nunito', 'sans-serif']
            },
            colors: {
                primary: "#FF69b4", // Can always use CSS variables too e.g. "var(--color-primary)",
                secondary: "#333333",
                brand: "#243c5a",
                agricash_leger: "#ccd621"
            },
        },
    },
    variants: {
        extend: {},
    },
   plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')

  ],
};


