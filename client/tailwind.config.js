/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'mont': 'Montserrat, sans-serif',
                'ubuntu': 'Ubuntu, sans-serif',
                'rale': 'Raleway, sans-serif',
            },
            spacing: {
                '128': '32rem',
                '150': '40rem',
            },
            brightness: {
                25: '.15',
            }
        },
    },
    plugins: [],
}

