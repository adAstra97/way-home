import { defineConfig } from 'vite';

export default defineConfig({
   base: './',
   build: {
      rollupOptions: {
         output: {
            assetFileNames: (assetInfo) => {
               let extType = assetInfo.name.split('.').at(-1);
               if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                  extType = 'img';
               }
               return `${extType}/[name]-[hash][extname]`;
            },
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
         },
      },
   },
});
