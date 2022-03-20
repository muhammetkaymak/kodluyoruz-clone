const { notify } = require('browser-sync');
const {src,dest,watch,series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

function scssTask(){
    return src('./scss/main.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(postcss([cssnano()]))
    .pipe(dest('./css/'))
}

function browsersyncServe(cb){
    browsersync.init({
        notify:false,
        server: {
            baseDir: './'
        }
    })
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

function watchTask(){
    watch('*.html',browsersyncReload);
    watch('./scss/**/*.scss',series(scssTask,browsersyncReload))
}

exports.default= series(
    scssTask,
    browsersyncServe,
    watchTask
);