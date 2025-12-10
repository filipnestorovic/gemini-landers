/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.ts",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                brand: {
                    50: '#f2fcf5',
                    100: '#e1f8e8',
                    200: '#c3eed0',
                    300: '#95deb0',
                    400: '#5fc38a',
                    500: '#39a76a',
                    600: '#2b8653',
                    700: '#266b45',
                    800: '#235539',
                    900: '#1d4631',
                }
            }
        },
    },
    plugins: [],
};
