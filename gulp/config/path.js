// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./build`; // путь к папке с результатом
const srcFolder = `./dev`; // путь к папке с исходниками

export const path = {
    build: {
        js: `${buildFolder}/js/scripts/`,
        appJs: `${buildFolder}/js/app/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        libs: `${buildFolder}/libs/`,
        svgicons: `${buildFolder}/img/svg/`,
        files: `${buildFolder}/files/`
    },
    src: {
        js: `${srcFolder}/js/scripts/*.js`,
        appJs: `${srcFolder}/js/app/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/*.scss`,
        html: `${srcFolder}/pug/pages/*.pug`,
        files: `${srcFolder}/files/**/*.*`,
        libsCss: `${srcFolder}/libs/*.css`,
        libsCssConcat: `${srcFolder}/libs/libsMin/*.css`,
        libsJs: `${srcFolder}/libs/*.js`,
        libsJsConcat: `${srcFolder}/libs/libsMin/*.js`,
        svgicons: `${srcFolder}/img/svg/*.svg`,
        // svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        appJs: `${srcFolder}/js/app/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/pug/**/*.pug`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*`,
        libs: `${srcFolder}/libs/*.*`,
        svgicons: `${srcFolder}/img/svg/*.svg`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'test' // имя папки которая создастся на удаленном сервере
}