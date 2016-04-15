module.exports=function () {
    var config={
        port:9005,
        devBaseUrl:'http:localhost',
        paths:{
            html:'./src/*.html',
            js:'./src/**/*.js',
            images:'./src/images/*',
            css:['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'],
            less:'./src/css/less/*.less',
            sass:'./src/css/sass/*.scss',
            dist:'./dist',
            mainJs:'./src/main.js'
        }
    }
    return config;
}