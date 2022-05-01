/* 
build-native.js: 
    - 核心任务是：重写../src/launcher.js的版本信息
    - 目标版本信息来自于package.json的版本号，修改模版文件中的@auto-fill注释信息
    - 输出日志为“Rewrite the version in launcher.js”
*/
const Path = require('path');
const Fs = require('fs');
const Ejs =require('ejs');
const BuildFiles = require('./package-files');

const template = Fs.readFileSync(Path.join(__dirname, './native.ejs')).toString();
const distPath = Path.join(__dirname, '../dist/');
const srcPath = Path.join(__dirname, '../src/');


(async function () {

    // 调用package-files.js模块，返回App源代码
    let { sourceCode, requireHeaders } = await BuildFiles();

    Fs.writeFileSync(Path.join(distPath, 'native.js'), sourceCode);
    Fs.writeFileSync(Path.join(distPath, 'pxer.user.js'), Ejs.render(template, { requireHeaders }));
    Fs.copyFileSync(Path.join(srcPath, 'launcher.js'), Path.join(distPath, 'launcher.js'));
    Fs.copyFileSync(Path.join(srcPath, 'launcher.js'), Path.join(distPath, 'jsonp.js'));

    console.log(`Release native`);
})();