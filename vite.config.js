import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/gbf/uploads': {
                target: 'https://huiji-public.huijistatic.com/',
                changeOrigin: true,
                secure: false,
                bypass: (req) => {
                    req.headers.referer = 'https://gbf.huijiwiki.com/';
                },
            },
        },
    },
    css: {
        loaderOptions: {
            css: {
                lessOptions: {
                    globalVars: {
                        imgBaseUrl:
                            process.env.NODE_ENV === 'production'
                                ? '"https://huiji-public.huijistatic.com"'
                                : '"http://localhost:3000"',
                    },
                },
            },
        },
    },
    build: {
        rollupOptions: {
            external: ['huijiwiki.css'],
            output: {
                entryFileNames: 'assets/[name].js',
                assetFileNames: (assetInfo) => {
                    const nameArray = assetInfo.name.split('/');
                    return 'assets/' + nameArray[nameArray.length - 1];
                },
            },
        },
        emptyOutDir: true,
    },
});
