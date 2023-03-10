import babel from 'gulp-babel';
import minify from 'gulp-babel-minify';

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        minify({
          mangle: {
            keepClassName: true,
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
