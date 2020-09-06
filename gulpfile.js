const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

//Minified css
gulp.task('css', function (done) {
       gulp.src('./assets/scss/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('./assets.css'));

       gulp.src('./assets/**/*.css')
     // gulp.src('./assets.css/*.css')
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.manifest({
          cwd:"public",
          merge:true
        }))
      .pipe(gulp.dest('./public/assets'))
      done();
  });

  //Minified javascript
  gulp.task('js', function (done) {
    gulp.src('./assets/**/*.js')
   .pipe(uglify())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd:"public",
       merge:true
     }))
   .pipe(gulp.dest('./public/assets'))
   done();
});

//Minified images
gulp.task('images', function (done) {
    gulp.src('./assets/**/*.(png|jpg|svg|gif|jpeg)')
    //gulp.src('./uploads/**/**/*.(png|jpg|svg|gif|jpeg)')
   .pipe(imagemin())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd:"public",
       merge:true
     }))
   .pipe(gulp.dest('./public/assets'))
   done();
});

//Whenever server will restart all old work done by gulp will be deleted and it will perform all the tasks and minificatin again
gulp.task("clean:assets" , function(done){
     del.sync("./public/assets");
     done();
});

//Run all the taks one by one 
gulp.task("build" , gulp.series("clean:assets" , "css" , "js" , "images" , function(done){
    done();
}));