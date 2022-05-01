// build-launcher.js: 
const Path = require('path');
const Fs = require('fs');
const Package = require('../package.json');     
// 读取根目录的package.json，目的是获取当前package的版本号，当前是‘2021.12.5’

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

