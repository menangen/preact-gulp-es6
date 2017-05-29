const del = require('del');
const gulp = require("gulp");

const util = require('gulp-util');
const pug = require('gulp-pug');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');

const rename = require("gulp-rename");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

const rollup = require('rollup-stream');
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");

const config = {
    production: !!util.env.production,

    distLocation: "dist",
    srcLocation: "src"
};

gulp.task("default", ["html", "less", "javascript"]);

gulp.task("watch", () => {
    gulp.watch(`${config.srcLocation}/pug/*.pug`, ["html"]);
    gulp.watch(`${config.srcLocation}/less/**.less`, ["less"]);
    gulp.watch(`${config.srcLocation}/js/*`, ["javascript"]);
});

gulp.task('html', () => {
    return gulp.src(`${config.srcLocation}/pug/*.pug`)
        .pipe(pug({
            pretty: !config.production
        }))
        .pipe(gulp.dest(`${config.distLocation}`));
});

gulp.task('javascript', () => {

    return rollup({
            // any option supported by Rollup can be set here.
            format: 'iife',
            sourceMap: !config.production,
            entry: `${config.srcLocation}/js/index.jsx`,
            moduleName: config.bundleName,
            plugins: [
                babel({
                    plugins: [
                        ["transform-react-jsx", {
                            "pragma": "h" // default pragma is preact.h
                        }]
                    ],
                    presets: ["es2015-rollup"]
                }),
                nodeResolve({ browser: true, jsnext: true, main: true }),
            ]
        })

        .pipe(source('all.js'))
        .pipe(buffer())
        .pipe(config.production ? uglify() : util.noop())
        .pipe(gulp.dest(`${config.distLocation}/js`));

});

gulp.task('less', () => {
    // less styles from src/less folder
    // only one root file need compile
    gulp.src(`${config.srcLocation}/less/main.less`)
        .pipe(config.production ? sourcemaps.init() : util.noop())
        .pipe(less())
        .pipe(config.production ? cssmin() : util.noop())
        .pipe(rename({suffix: '.min'}))
        .pipe(config.production ? sourcemaps.write() : util.noop())
        .pipe(gulp.dest(config.distLocation +'/css'));
});

gulp.task('clean', function() {
    del([config.distLocation]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});