/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mont: 'Montserrat, sans-serif',
                ubuntu: 'Ubuntu, sans-serif',
                rale: 'Raleway, sans-serif',
            }
        },
    },
    plugins: [],
}

