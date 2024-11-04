import { defineConfig, squooshImageService } from 'astro/config';
import viteSassGlob from 'vite-plugin-sass-glob-import';
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  site: 'https://askomarov.github.io',
  compressHTML: false,
  output: 'static',
  publicDir: './public',
  build: {
    format: 'file', // вытаскивает вложенные страницы в корень src/pages/subpage/subpage.html => dist/subpage.html
    assets: 'assets',
    assetsPrefix: '.', // добавляет `.` в пути скриптов и стилей
    // inlineStylesheets: 'never', // запрещает инлайн стилей
  },
  image: {
    service: squooshImageService(),
  },
  integrations: [
    icon({
      svgoOptions: {
        plugins: [
          'preset-default'
        ],
      },
    })
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
    build: {
      minify: false,
      assetsInlineLimit: 0, // запрещает инлайн скриптов. по дефолту инлайнит скрипты в html
      cssCodeSplit: false, // css в один файл
      rollupOptions: {
        output: {
          entryFileNames: 'scripts.js',
          assetFileNames: (assetInfo) => {
            return assetInfo.name === 'style.css'
              ? `${assetInfo.name}` // задается имя и папка (корень) для css
              : `assets/${assetInfo.name}`; // задается имя и папка картинкам
          },
        },
      },
    },
    plugins: [
      viteSassGlob()
    ],
  },
});
