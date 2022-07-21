import { fileURLToPath, URL } from 'url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log(mode);

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            port: 1007,
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
            preprocessorOptions: {
                less: {
                    additionalData: (() => {
                        return `@import "./src/assets/common.${command}.less";`;
                    })(),
                },
            },
        },
        build: {
            rollupOptions: {
                external: ['huijiwiki.css'],
                output: {
                    entryFileNames: 'assets/[name].js',
                    assetFileNames: (assetInfo) => {
                        const nameArray = assetInfo.name!.split('/');
                        return 'assets/' + nameArray[nameArray.length - 1];
                    },
                },
            },
            emptyOutDir: true,
        },
    };
});
