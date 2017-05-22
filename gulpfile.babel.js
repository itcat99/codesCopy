import path from 'path';
import gulp from 'gulp';
import sass from 'gulp-sass';
import download from 'gulp-download';
/*
  vars
*/
let jsPath = path.join(__dirname, 'src/*.js');
let cssPath = path.join(__dirname, 'src/*.scss');

let cssDestPath = path.join(__dirname, 'dist/content/');
let libsPath = path.join(__dirname, 'dist/libs');
let serveLibsPath = path.join(__dirname, 'libs');
/*
  scss
*/
gulp.task('scss', () => {
  return gulp.src(cssPath)
    .pipe(sass())
    .pipe(gulp.dest(cssDestPath));
});

/*
  copy
*/
gulp.task('copy', () => {
  gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/tesseract.js/dist/tesseract.js'])
    .pipe(gulp.dest(libsPath));

  gulp.src('./node_modules/csspin/css/csspin-round.css')
    .pipe(gulp.dest(libsPath));

  // codeMirror Plugin core
  gulp.src(['./node_modules/codemirror/lib/codemirror.js', './node_modules/codemirror/lib/codemirror.css'])
    .pipe(gulp.dest(path.resolve(libsPath, 'codemirror')));
  // codeMirror Plugin theme
  gulp.src(['./node_modules/codemirror/theme/zenburn.css'])
    .pipe(gulp.dest(path.resolve(libsPath, 'codemirror/theme')));
  // codeMirror Plugin supports
  gulp.src(['./node_modules/codemirror/addon/selection/active-line.js', './node_modules/codemirror/addon/edit/matchbrackets.js'])
    .pipe(gulp.dest(path.resolve(libsPath, 'codemirror/supports')));
  // codeMirror Plugin Languages
  gulp.src(['./node_modules/codemirror/mode/javascript/javascript.js'])
    .pipe(gulp.dest(path.resolve(libsPath, 'codemirror/languages')));


  // Cropperjs Plugin
  gulp.src(['./node_modules/cropperjs/dist/cropper.min.js', './node_modules/cropperjs/dist/cropper.min.css'])
    .pipe(gulp.dest(path.resolve(libsPath, 'cropperjs')));
});

/*
  watch
*/
gulp.task('watch', () => {
  return gulp.watch('./src/*.scss', ['scss']);
});