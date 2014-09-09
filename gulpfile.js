var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    browserify = require('browserify'),

    index = './src/index.js',
    outdir = './dist',
    bundle = 'Phaser.Plugin.Debug',
    outfile = 'phaser-debug.js';

function rebundle(file) {
    if (file) {
        gutil.log('Rebundling,', path.basename(file[0]), 'has changes.');
    }

    return this.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(outfile))
        .pipe(gulp.dest(outdir));
}

function createBundler(args) {
    args = args || {};
    args.standalone = bundle;

    var bundler = browserify(index, args);

    bundler.transform('node-lessify');

    return bundler;
}

/*****
 * Dev task, incrementally rebuilds the output bundle as the the sources change
 *****/
gulp.task('dev', function() {
    watchify.args.standalone = bundle;
    var bundler = watchify(createBundler(watchify.args));

    bundler.on('update', rebundle);

    return rebundle.call(bundler);
});

/*****
 * Build task, builds the output bundle
 *****/
gulp.task('build', function () {
    return rebundle.call(createBundler());
});

/*****
 * Base task
 *****/
gulp.task('default', ['build']);