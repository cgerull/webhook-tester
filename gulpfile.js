const gulp = require('gulp');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');


gulp.task('develop', () => {
  process.env.NODE_ENV = 'development'
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('test', () => {
  gulp.src(['test/**/*.js'], {read: false})
		.pipe(mocha({reporter: 'list', exit: true}))
		.on('error', console.error)
});

gulp.task('default', [
  'develop'
]);
