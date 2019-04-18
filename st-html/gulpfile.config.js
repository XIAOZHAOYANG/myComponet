var SRC_DIR = './src/';     // 源文件目录  
var DIST_DIR = './dist/';   // 文件处理后存放的目录  
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    css: {  
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/  
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css  
    },  
    less: {  
        src: SRC_DIR + 'less/*.less',         // LESS目录：./src/less/  
        dist: SRC_DIR + 'css'                   // LESS文件生成CSS后存放的目录：./src/css  
    },  
    js: {  
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js  
        build_name: 'build.js'                   // 合并后的js的文件名  
    },
    img: {  
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    },
    icon: {  
        src: SRC_DIR + 'icon/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    },
    page:{
        src:SRC_DIR+'page/*',
        dist: DIST_DIR + 'page' 
    }
};

module.exports = Config;