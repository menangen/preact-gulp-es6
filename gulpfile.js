let del = require('del');
let gulp = require("gulp");

let util = require('gulp-util');
let pug = require('gulp-pug');
let less = require('gulp-less');
let cssmin = require('gulp-cssmin');

let rename = require("gulp-rename");
let source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
let concat = require("gulp-concat");

let rollup = require('rollup-stream');
let babel = require("rollup-plugin-babel");
//let includePaths = require("rollup-plugin-includepaths");
let nodeResolve = require("rollup-plugin-node-resolve");
//let commonjs = require("rollup-plugin-commonjs");

let config = {
    production: !!util.env.production,

    distLocation: "dist",
    srcLocation: "src",

    includePathOptions: {
        include: {
            'vue': 'node_modules/vue/dist/vue.js'
        },
        paths: ['src/js']
    }
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
                //includePaths(config.includePathOptions),
                nodeResolve({ browser: true, jsnext: true, main: true }),
                //commonjs()
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
        //.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(config.production ? cssmin() : util.noop())
        .pipe(rename({suffix: '.min'}))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.distLocation +'/css'));
});

gulp.task('clean', function() {
    del([config.distLocation]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});