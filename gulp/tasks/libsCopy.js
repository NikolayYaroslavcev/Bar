import cleanCss from 'gulp-clean-css';
import autoprefixer from "gulp-autoprefixer";
import uglify from "gulp-uglify"
import concat from "gulp-concat"

export const libsCopyCss = () => {
    return app.gulp.src(app.path.src.libsCss)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "libsCopyCss",
                message: "Error: <%= error.message %>"
            })))
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(app.gulp.dest(app.path.build.libs))
        .pipe(app.plugins.browsersync.stream())
}

export const libsCopyJs = () => {
    return app.gulp.src(app.path.src.libsJs)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "libsCopyJs",
                message: "Error: <%= error.message %>"
            })))
        .pipe(
            app.plugins.if(
                app.isBuild,
                uglify()))
        .pipe(app.gulp.dest(app.path.build.libs))
        .pipe(app.plugins.browsersync.stream())
}

export const libsConcatCss = () => {
    return app.gulp.src(app.path.src.libsCssConcat)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "libsCopyCss",
                message: "Error: <%= error.message %>"
            })))
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(concat('libs.min.css'))
        .pipe(app.gulp.dest(app.path.build.libs))
        .pipe(app.plugins.browsersync.stream())
}

export const libsConcatJs = () => {
    return app.gulp.src(app.path.src.libsJsConcat)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "libsCopyJs",
                message: "Error: <%= error.message %>"
            })))
        .pipe(
            app.plugins.if(
                app.isBuild,
                uglify()))
        .pipe(concat('libs.min.js'))
        .pipe(app.gulp.dest(app.path.build.libs))
        .pipe(app.plugins.browsersync.stream())
}