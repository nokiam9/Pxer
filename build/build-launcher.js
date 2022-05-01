/* 
build-launcher.js: 
    - 核心任务是：重写../src/launcher.js的版本信息
    - 目标版本信息来自于package.json的版本号，修改模版文件中的@auto-fill注释信息
    - 输出日志为“Rewrite the version in launcher.js”
*/
const Path = require('path');
const Fs = require('fs');
const Package = require('../package.json');     

const launcherFile = Path.join(__dirname, '../src/launcher.js');
const tag = '/*@auto-fill*/';

// 任务是从../src/launcher.js，
Fs.writeFileSync(
    launcherFile,
    Fs.readFileSync(launcherFile).toString().replace(
        /\/\*@auto-fill\*\/.+?\/\*@auto-fill\*\//,
        `/*@auto-fill*/'${Package.version}'/*@auto-fill*/`
    ),
);

console.log('Rewrite the version in launcher.js');

