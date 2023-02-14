export const copyDist = () => {
    return app.gulp.src('./dist/**/*.*')
    .pipe(app.gulp.dest('./'))
}