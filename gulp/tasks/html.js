import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "html",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(
            pug({
                pretty: true,
                verbose: true
            })
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}