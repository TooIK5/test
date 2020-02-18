let project_folder = require("path").basename(__dirname);
let source_folder = "#src";
let fs = require('fs');

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/", 
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg, png, svg, ico, webp}",
        fonts: source_folder + "/fonts/*.ttf", 
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg, png, svg, ico, webp}",
    },
    clean: "./" + project_folder + "/"   
}
let { src, dest} = require("gulp"),
    gulp = require('gulp'),
    scss = require("gulp-sass")(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    uglify = require("gulp-uglify-es").default,
    fileinclude = require("gulp-file-include"),
    imagemin = require("gulp-imagemin"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    //svgSprite = require("gulp-svg-sprite"),
    group_media = require("gulp-group-css-media-queries"),
    browsersync = require("browser-sync").create();
    
    function browserSync(params) {
        browsersync.init({
            server: {
                baseDir: "./" + project_folder + "/",
            },
            port: 3000,
            notify: false
        });
    };

    function html(params) {
        return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
    }

    function images(params) {
        return src(path.src.img)
        .pipe(
            webp({
              quality: 70     
            })
            )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 //0 ... 7
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
    }

    function js(params) {
        return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
    }

    function watchFiles(params) {
        gulp.watch([path.watch.html], html);
        gulp.watch([path.watch.css], css);
        gulp.watch([path.watch.js], js);
    }

 

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }

    }

       function cb(params) {
        
    }

    function css(params) {
        return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
    }

    function fonts(params) {
        src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
     return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
    }

    gulp.task('otf2ttf', function() {
        return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))
    })

    function defaultTask(cb) {
    cb();
    }

  let build = gulp.series(gulp.parallel(js, fonts,css, html, images));
  let watch = gulp.parallel(build, browserSync, watchFiles)
  
  exports.fonts = fonts;
  exports.fontsStyle = fontsStyle;
  exports.images = images;
  exports.js = js;
  exports.css = css;
  exports.html = html;
  exports.build = build;
  exports.watch = watch;
  exports.default = watch;