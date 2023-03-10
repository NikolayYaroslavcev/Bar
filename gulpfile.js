// Основной модуль
import gulp from 'gulp';

// мпорт путей
import { path } from './gulp/config/path.js';

// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { libsCopyCss, libsCopyJs, libsConcatCss, libsConcatJs } from './gulp/tasks/libsCopy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { appJs } from './gulp/tasks/appJs.js';
import { images } from './gulp/tasks/images.js';
import { ttfToWoff, ttfToWoff2, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.appJs, appJs);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.images, svgSprive);
  gulp.watch(path.watch.libs, libsCopyCss);
  gulp.watch(path.watch.libs, libsCopyJs);
  gulp.watch(path.watch.libs, libsConcatCss);
  gulp.watch(path.watch.libs, libsConcatJs);
}

export { svgSprive };

// Последовательность обработки шрифтов
const fonts = gulp.series(ttfToWoff, ttfToWoff2, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(
    copy,
    html,
    scss,
    js,
    appJs,
    images,
    svgSprive,
    libsCopyCss,
    libsCopyJs,
    libsConcatCss,
    libsConcatJs
  )
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Выполнение ценария по умолчанию
gulp.task('default', dev);
