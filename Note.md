# Pxer的技术分析报告

## 目录结构和导入点

``` console
JiandeiMac:Pxer sj$ tree -F
Pxer
├── Dockerfile
├── LICENSE
├── Note.md                     # 本文件，是对Pxer的分析报告
├── README.md
├── README.zh.md
├── build/                      # build/：包含若干个脚本文件
│   ├── build-launcher.js
│   ├── build-native.js
│   ├── build-sfp.js
│   ├── native.ejs
│   ├── package-files.js
│   └── sfp.ejs
├── dist/                       # dist/：是build中脚本文件的输出结果，也是localhost:8125的文件体系
├── nginx.conf
├── package-lock.json
├── package.json                # 用于npm打包的配置文件
├── public/
│   ├── favicon.ico
│   ├── i18n/
│   │   ├── en.json
│   │   ├── ja.json
│   │   └── zh.json
│   ├── pxer-ui.gif
│   └── test-ui.html
├── push-tag-image.sh
├── src/                        # src/：源码文件，其中部分文件需要build
│   ├── app/
│   │   ├── PxerApp.js
│   │   ├── PxerData.js
│   │   ├── PxerEvent.js
│   │   ├── PxerFilter.js
│   │   ├── PxerHtmlParser.js
│   │   ├── PxerPrinter.js
│   │   ├── PxerThread.js
│   │   ├── PxerThreadManager.js
│   │   ├── regexp.js
│   │   └── util.js
│   ├── files.json              # 需要安装的文件列表信息
│   ├── launcher.js             # 
│   ├── local.js
│   ├── local.user.js           # 本地TamperMonkey的入口文件，任务就是一个，加载`src/launcher.js`
│   └── view/
│       ├── AutoSuggestControl.js
│       ├── analytics.js
│       ├── i18n.js
│       ├── style.scss
│       ├── template.html
│       └── vm.js
└── types.d.ts
```

## 位于公网的应用安装点

在公网的安装地址位于：[https://pxer-app.pea3nut.org/](https://pxer-app.pea3nut.org/)
其内容就是一个文件服务器，其目录结构为：

``` console
../
public/                                            05-Dec-2021 11:50       -
jsonp.js                                           05-Dec-2021 11:50    3851
launcher.js                                        05-Dec-2021 11:50    3851
native.js                                          05-Dec-2021 11:50    306K
pxer.user.js                                       05-Dec-2021 11:50    1403
sfp.user.js                                        05-Dec-2021 11:50    311K
```

## 关于 npm build dev

``` yaml
    "dev": "npm run build && ws --https --port 8125 --cors.origin=*",
    "build": "node-sass src/ --output src/ && node build/build-launcher && node build/build-native && node build/build-sfp",
```

- `node-sass src/ --output src/`: 寻找src/目录下的sass文件，并编译为css文件
- `node build/build-launcher`: 根据模版文件，生成安装脚本`launcher.js`
- `node build/build-native`: 根据模版文件，生成App的主应用代码，来自于src/app和src/view等
- `node build/build-sfp`: sfp模式与native模式的代码基本相同，运行模式的区别还不清楚？
- `ws --https --port 8125 --cors.origin=*`: 打开websocket，结果就是启动了一个webserver，`https://localhost:8125`就是github上的源码内容？
