module.exports = {
    // darkMode: 'class',
    plugins: [],
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1366px',
            '3xl': '1600px',
        },
    },
    corePlugins: {
        preflight: false,
        container: false,
    },
};
