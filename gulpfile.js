
var gulp = require('gulp')
var gutil = require('gulp-util')
var glob = require('glob')
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
  gulp.src([ './app/boot.scss' ])
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('buildHTML', function() {
  gulp.src([ './app/**/*.html', skipMatcher ])
      .pipe(gulp.dest('./public'))
})

gulp.task('buildJS', function() {

  glob('./app/**/*.req.js', function(e, widgets) {

    browserify('./app/boot.js')

      // use lodash instead of underscore
      .transform(function() {
        var data = ''
        var widgetRequires = widgets
          .map(function(widget) {
            return "require('" + widget.replace('/app', '') + "');"
          }).join('')
        return through(function(b) { data += b }, function() {
          var replaced = data
            .replace(/underscore/g, 'lodash')
            .replace('// require all widgets', widgetRequires)
          this.queue(replaced)
          this.queue(null)
        })
      })

      // search for modules in public/bower_components
      .transform(debowerify)

      // returns read stream
      .bundle({ debug: true })

      // turns browserify stream into stream that return vinyl file object... weird, but whatever
      .pipe(source('boot.js'))

      // put to file!!
      .pipe(gulp.dest('./public/js'))
  })
})

var skipMatcher = '!./app/{bower_components,bower_components/**}'

gulp.task('watch', function() {
  gulp.watch([ './app/**/*.js', skipMatcher], [ 'buildJS' ])
  gulp.watch([ './app/**/*.scss', skipMatcher], [ 'buildCSS' ])
  gulp.watch([ './app/**/*.html', skipMatcher], [ 'buildHTML' ])
})

gulp.task('server', function() {
  exec('static public', console.log)
})

gulp.task('dev', [ 'server', 'watch' ])

//==========================================================================//
// This file is part of multi-site-client-poc.                              //
//                                                                          //
// multi-site-client-poc is Copyright 2014 Volary Foundation and            //
// Contributors                                                             //
//                                                                          //
// multi-site-client-poc is free software: you can redistribute it and/or   //
// modify it under the terms of the GNU Affero General Public License as    //
// published by the Free Software Foundation, either version 3 of the       //
// License, or at your option) any later version.                           //
//                                                                          //
// multi-site-client-poc is distributed in the hope that it will be useful, //
// but WITHOUT ANY WARRANTY; without even the implied warranty of           //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero  //
// General Public License for more details.                                 //
//                                                                          //
// You should have received a copy of the GNU Affero General Public         //
// License along with multi-site-client-poc.  If not, see                   //
// <http://www.gnu.org/licenses/>.                                          //
//==========================================================================//
