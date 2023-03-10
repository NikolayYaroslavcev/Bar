import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';

export const svgSprive = () => {
  return (
    app.gulp
      .src(`${app.path.src.svgicons}`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'SVG',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(
        svgmin({
          js2svg: {
            pretty: true,
          },
        })
      )
      .pipe(
        cheerio({
          run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: { xmlMode: true },
        })
      )
      // .pipe(replace('&gt;', '>'))
      .pipe(
        svgSprite({
          mode: {
            stack: {
              sprite: `../symbol/sprite.svg`,
              // Создать страницу с перечнем иконок
              // example: true
            },
          },
        })
      )
      .pipe(app.gulp.dest(`${app.path.build.svgicons}`))
  );
};
