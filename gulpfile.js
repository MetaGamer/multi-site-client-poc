
var gulp = require('gulp')
var gutil = require('gulp-util')
var plumber = require('gulp-plumber')
var exec = require('child_process').exec
var sass = require('gulp-sass')
var browserify = require('browserify')
var debowerify = require('debowerify')
var source = require('vinyl-source-stream')
var through = require('through')

gulp.task('test', [ 'test:units', 'test:features' ])

gulp.task('test:units', function() {
  exec('NODE_ENV=test mocha test/units/ --colors --recursive --compilers coffee:coffee-script/register --reporter spec', function(e, stdout, stderr) {
    console.log(stdout, stderr)
  })
})

gulp.task('test:features', function() {
  exec('NODE_ENV=test mocha test/features/ --colors --recursive --compilers coffee:coffee-script/register --reporter spec', function(e, stdout, stderr) {
    console.log(stdout, stderr) 
  })
})

gulp.task('buildCSS', function () {
  gulp.src('./app/boot.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('buildHTML', function() {
  gulp.src('./app/**/*.html')
      .pipe(gulp.dest('./public'))
})

gulp.task('buildJS', function() {

  browserify('./app/boot.js')

    // use lodash instead of underscore
    .transform(function() {
      var data = ''
      return through(function(b) { data += b }, function() {
        this.queue(data.replace(/underscore/g, 'lodash'))
        this.queue(null)
      })
    })

    // search for modules in public/bower_components
    .transform(debowerify)

    // returns read stream
    .bundle()

    // turns browserify stream into stream that return vinyl file object... weird, but whatever
    .pipe(source('boot.js'))

    // put to file!!
    .pipe(gulp.dest('./public/js'))
})

gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', [ 'buildJS' ])
  gulp.watch('./app/**/*.scss', [ 'buildCSS' ])
  gulp.watch('./app/**/*.html', [ 'buildHTML' ])
})

gulp.task('server', function() {
  exec('static public', console.log)
})

gulp.task('dev', [ 'server', 'watch' ])
