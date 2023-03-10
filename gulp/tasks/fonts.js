import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const getFontWeightValue = (fontWeight) => {
  switch (fontWeight) {
    case 'thin':
      return (fontWeight = 100);
    case 'extralight':
      return (fontWeight = 200);
    case 'light':
      return (fontWeight = 300);
    case 'medium':
      return (fontWeight = 500);
    case 'semibold':
      return (fontWeight = 600);
    case 'bold':
      return (fontWeight = 700);
    case 'extrabold':
      return (fontWeight = 800);
    case 'heavy':
      return (fontWeight = 800);
    case 'black':
      return (fontWeight = 900);
    default:
      return (fontWeight = 400);
  }
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}.fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ['eot'],
        })
      )
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Конвертируем в .woff2
      .pipe(ttf2woff())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const ttfToWoff2 = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}.fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ['eot'],
        })
      )
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontsStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Првоеряем существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          const fileNameToLowerCase = fontFileName.toLowerCase();

          if (newFileOnly !== fontFileName) {
            const fontName = fileNameToLowerCase.split('_')[1]
              ? fileNameToLowerCase.split('_')[1]
              : fileNameToLowerCase;

            const fontWeightText = fileNameToLowerCase.split('_')[0]
              ? fileNameToLowerCase.split('_')[0]
              : fileNameToLowerCase;

            const fontWeight = getFontWeightValue(fontWeightText);

            fs.appendFile(
              fontsFile,
              `@font-face {
  font-family: "${fontName}";
  font-display: swap;
  src: url("../fonts/${fontFileName}.woff") format("woff"),
    url("../fonts/${fontFileName}.woff2") format("woff2");
  font-weight: ${fontWeight};
  font-style: normal;
}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!');
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
