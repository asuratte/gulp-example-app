var gulp = require('gulp');
var gulpprint = require('gulp-print').default;
gulpprint();
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();
var del = require('del');

gulp.task('vet', function(done){
    gulp.src(config.alljs)
    .pipe($.if(args.verbose,gulpprint()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
    .pipe($.jshint.reporter('fail'));
    done();
});

gulp.task('styles', function() {
   // gulp.task('styles', ['clean-styles'], function() {
    log('Compiling LESS --> CSS');
    return gulp
    .src(config.less)
    .pipe($.less())
    .pipe($.autoprefixer({overrideBrowserslist: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
var files = config.temp + '**/*.css';
clean(files, done);

});

/////////////
function clean(path, done){
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}


function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}