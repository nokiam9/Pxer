window['pxer'] = window['pxer'] || {};
pxer.util = pxer.util || {};

// 定义pxer.util.afterLoad方法：就是给DOMContentLoaded挂了一个时间侦听器
pxer.util.afterLoad =function(fn){
    if(document.readyState !== 'loading'){
        setTimeout(fn);
    }else{
        document.addEventListener('DOMContentLoaded', fn);
    }
};

// Todo：定义pxer.util.compile方法：作用不详？
pxer.util.compile = function (str, scope = window) {
    let matchResult = null;
    while (matchResult = str.match(/{{\s*([\w_]+)\s*}}/)) {
        str = str.replace(matchResult[0], scope[matchResult[1]]);
    }
    return str;
};

// 定义pxer.util.set方法：将[key, val]储存在obj的变量中
pxer.util.set = function (obj, key, val) {
    const keys = key.split('.');
    let pointer = obj;
    for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
            pointer[keys[i]] = val;
        } else {
            pointer[keys[i]] = pointer[keys[i]] || {};
            pointer = pointer[keys[i]];
        }
    }
};

// 定义pxer.util.get方法：通过递归调用方式，遍历读取指定变量的内容
// @ref https://www.jianshu.com/p/162dad820f48
pxer.util.get = function self(data,f){
    if(f.substr) f = f.split(/\.|\\|\//);

    if(f.length && data){
        return self(data[f.shift()],f)
    }else if(!f.length && data){
        return data
    }else {
        return "";
    }
};

// 定义pxer.util.addFile方法：构造js脚本，根据js、css、json、ico采用不同的处理方式
pxer.util.addFile = async function (url) {
    const sector = url.includes('?') ? '&' : '?';
    const pxerVersion = /*@auto-fill*/'2021.12.5'/*@auto-fill*/;

    if (!/^(https?:)?\/\//.test(url)) url = pxer.url + url;
    url = url + sector + `pxer-version=${pxerVersion}`;

    const createScript = () => new Promise(function (resolve, reject) {
        const elt = document.createElement('script');
        elt.addEventListener('error', reject);
        elt.addEventListener('load', resolve);
        elt.addEventListener('load', () => pxer.log('Loaded ' + url));
        elt.src = url;
        document.documentElement.appendChild(elt);
        return elt;
    });
    const createCss = () => new Promise(function (resolve) {
        const elt = document.createElement('link');
        elt.rel = 'stylesheet';
        elt.href = url;
        document.documentElement.appendChild(elt);
        resolve();
    });
    const createIcon = () => new Promise(function (resolve) {
        pxer.util.afterLoad(() => {
            Array.from(document.querySelectorAll("link[rel*='icon']")).forEach(elt => elt.href = url);
        });
        (document.head || document.documentElement).appendChild(function(){
            const elt = document.createElement('link');
            elt.rel = 'shortcut icon';
            elt.type = 'image/x-icon';
            elt.href = url;
            return elt;
        }());
        resolve();
    });

    const fileFormat = url.match(/\.([^.]+?)(\?.+?)?$/)[1];
    switch (fileFormat) {
        case 'js':
            return createScript();
        case 'css':
            return createCss();
        case 'ico':
            return createIcon();
        case 'json':
            return fetch(url).then(res => res.json());
        default:
            return fetch(url).then(res => res.text());
    }
};

(async function(){
    // 从local.user.js中引入时，PXER_URL='https://127.0.0.1:8125/' && PXER_MODE='local'
    window['PXER_URL'] = window['PXER_URL'] || 'https://pxer-app.pea3nut.org/';
    window['PXER_MODE'] = window['PXER_MODE'] || 'native';
    window['PXER_LANG'] = window['PXER_LANG'] || (document.documentElement.lang || window.navigator.language).split('-')[0];

    pxer.url = PXER_URL;
    pxer.mode = PXER_MODE;
    pxer.lang = PXER_LANG;
    pxer.log = (...msg) => console.log('[Pxer]', ...msg);

    switch (PXER_MODE) {
        case 'dev':
        case 'master':
            // old version doesn't declare "@require vuejs"
            await pxer.util.addFile('https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js');
        case 'native':
            // 远程加载代码文件，位于：https://pxer-app.pea3nut.org/native.js
            await pxer.util.addFile('native.js');
            break;
        case 'local':
            // 本地加载代码文件，位于：'https://127.0.0.1:8125/src/local.js
            await pxer.util.addFile('src/local.js');
            break;
        case 'sfp':
            break;
    }
})().catch(console.error);