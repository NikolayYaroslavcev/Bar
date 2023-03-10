import webpack from "webpack-stream";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); /* Webpack требует абсолютный путь к папке */
const DEV_APP_FOLDER = './dev/js/app/';

const gatJSEntryPoints = (folder) => {
    const entryPoints = {};

    fs.readdirSync(folder).forEach((file) => {
        const path = `${folder}${file}`;
        const isDir = fs.lstatSync(path).isDirectory();

        if (!isDir) {
            entryPoints[`${file}`] = path;
        }
    })

    return entryPoints;
};

export const appJs = () => {
    return app.gulp.src(app.path.src.appJs, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({
            mode: app.isDev ? 'production' : 'development',
            entry: gatJSEntryPoints(DEV_APP_FOLDER),
            output: {
                filename: '[name].js',
                path: `${__dirname}${app.path.build.appJs}`,
            }
        }))
        .pipe(app.gulp.dest(app.path.build.appJs))
        .pipe(app.plugins.browsersync.stream());
}