/* 
package-files.js: 模块文件
    - 核心任务是：读取../src/files.json中的文件列表信息，并返回{源代码构造文件：公网调用文件信息}
*/
const Path = require('path');
const Fs = require('fs');
const request = require('request');

// ../src/files.json是一个json格式的文件列表，包含了多个数组，主要字段包括：src、saveAs、requirePath
const lists = require('../src/files.json');

module.exports = async function () {
    let sourceCode = '';
    let requireHeaders = '';

    for (const list of lists) {             // files.json包含了多个列表
        for (const info of list) {          // 读取一级列表的各个二级列表
            if (info.requirePath) {         // 外部引用的资源，主要是Vue.min.js
                requireHeaders += `// @require        ${info.requirePath}\n`
            } else {
                let fileContent = '';
                // 直接从公网下载代码，目前只有一个，就是"https://point.pea3nut.org/sdk/1.0/browser.js"，看起来是设置EventSender事件
                if (info.src.startsWith('http')) {      
                    fileContent = await new Promise((resolve, reject) => request(info.src, function (error, response, body) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(body);
                    }))
                } else {
                    // 从本地src目录下载代码
                    fileContent = Fs.readFileSync(Path.join(__dirname, '../', info.src));
                }

                // 构造代码时，补充源文件的注释信息
                sourceCode += `\n\n// ${info.src}\n`;

                if (info.saveAs) {
                    // 如果声明要求文件存盘，则判断是json文件，还是js文件；并调用pxer.util.set方法
                    let count = info.src.endsWith('.json') ? fileContent : '`' + fileContent + '`';
                    sourceCode += `pxer.util.set(pxer, '${info.saveAs}', ${count})`;
                } else if (info.src.endsWith('.ico')) {
                    // 如果src是一个ico图标，就调用pxer.util.addFile方法，追加文件
                    sourceCode += `pxer.util.addFile('${info.src}')`;
                } else if (info.src.endsWith('.css')) {
                    // 如果src是一个css文件，直接在DOM中增加style信息
                    sourceCode += 'document.documentElement.appendChild(\n';
                    sourceCode += '    document.createElement(\'style\')\n';
                    sourceCode += ').innerHTML = `'+ fileContent +'`;\n';
                } else {
                    sourceCode += fileContent;
                }

                sourceCode += `\n;\n`;
            }
        }
    }

    requireHeaders = requireHeaders.trim();

    return { sourceCode, requireHeaders };
};
