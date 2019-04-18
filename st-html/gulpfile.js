var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var less = require('gulp-less'); //less
var jshint = require('gulp-jshint'); //js检查
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
var imagemin = require('gulp-imagemin'); //图片压缩 
var Config = require('./gulpfile.config.js');

var spritesmith = require("gulp.spritesmith")
// HTML 生成
var gulp_tpl = require('gulp-template')
 
// 图标合并
gulp.task('sprite',function(){
    gulp.src("./src/icon/*.png")
        .pipe(spritesmith({
            imgName:'./images/sprite.png', //合并后大图的名称
            cssName:'./css/sprite.css',
            padding:2,// 每个图片之间的间距，默认为0px
            cssTemplate:(data)=>{
            // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
               let arr = [],
                    width = data.spritesheet.px.width,
                    height = data.spritesheet.px.height,
                    url =  data.spritesheet.image
                data.sprites.forEach(function(sprite) {
                    arr.push(
                        ".icon-"+sprite.name+
                        "{"+
                            "background: url('"+url+"') "+
                            "no-repeat "+
                            sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                            "background-size: "+ width+" "+height+";"+
                            "width: "+sprite.px.width+";"+                       
                            "height: "+sprite.px.height+";"+
                        "}\n"
                    ) 
                })
                return arr.join("")
            }
        }))
        .pipe(gulp.dest("./src/icon/"))
});

// html 生成
gulp.task('page',function(){
    return gulp.src(Config.page.src,function(err,files) {
        files.map(function (entry) {
            gulp.src(['./src/htmlTemplate/list.html'])
            .pipe(gulp_tpl(require(entry))) 
            .pipe(gulp.dest('./dist/pageHtml/'+require(entry).pageName));

            gulp.src(['./src/jsTemplate/list.js'])
            .pipe(gulp_tpl(require(entry))) 
            .pipe(gulp.dest('./dist/pageJs/'+require(entry).pageName));
        });
    });
});

/** 
 * LESS样式处理 
 */
gulp.task('less', function () {
    return gulp.src(Config.less.src)
    		.pipe(concat('less.css')) // 合并后的文件名
    		.pipe(less())  //转换less到css
        .pipe(gulp.dest(Config.less.dist));
});
/** 
 * CSS样式处理 
 */
gulp.task('css:dev', function () {
    return gulp.src(Config.css.src)
    		.pipe(autoprefixer('last 2 version'))  // 主流浏览器的最新两个版本加前缀
    		.pipe(concat('base.min.css')) // 合并后的文件名
    		.pipe(cssnano()) //执行压缩
        .pipe(gulp.dest(Config.css.dist));
});
/** 
 * js处理 
 */
gulp.task('js:dev', function() {
	return gulp.src(Config.js.src)
			.pipe(jshint())   // 进行检查
			.pipe(jshint.reporter('default'))   // 对代码进行报错提示
			.pipe(concat('base.min.js'))   // 合并到base.js
			.pipe(uglify())    // 压缩js
			.pipe(gulp.dest(Config.js.dist));
});
/** 
 * 图片处理 
 */
gulp.task('images:dev', function() {
	return gulp.src(Config.img.src).pipe(imagemin({
		optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
		progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
		interlaced: true //类型：Boolean 默认：false 隔行扫描gif进行渲染
	})).pipe(gulp.dest(Config.img.dist));
});
// 帮助
gulp.task('help',function () {
  console.log('	gulp less		less转为css');
  console.log('	gulp build		图片、js、css压缩');
  console.log('	gulp help		gulp参数说明');
});
// less转为css
//gulp.task('less', ['less:dev'], function() {
//	gulp.watch(Config.less.src, ['less:dev']); //监听文件夹变化并自动编译less为css
//});
// 打包并合并图片、css、js
gulp.task('build', ['css:dev', 'js:dev', 'images:dev']);
