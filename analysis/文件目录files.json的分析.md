
# 全量文件的作用分析

- ./package.json: saveAs": "package"

## Pxer的UI模版，位于/src/view

- src/view/template.html: "saveAs": "uiTemplate"
- src/view/style.css:
- public/favicon.ico"

## TamperMonkey需要的Vue包

- node_modules/vue/dist/vue.min.js": "requirePath": "https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js"

## SDK？

- `https://point.pea3nut.org/sdk/1.0/browser.js`: **这个还不清楚**

## Pxer的通用函数定义，位于/src/app

- src/app/util.js
- src/app/regexp.js
- src/app/PxerData.js
- src/app/PxerEvent.js

## 多语种的文字信息，位于/public

- src/view/i18n.js
- public/i18n/en.json":     "saveAs": "i18nMap.en"
- public/i18n/zh.json":      "saveAs": "i18nMap.zh"
- public/i18n/ja.json":     "saveAs": "i18nMap.ja"

## Pxer的Class定义，位于/src/app

- src/app/PxerFilter.js：
- src/app/PxerHtmlParser.js：
- src/app/PxerPrinter.js：
- src/app/PxerThread.js：
- src/app/PxerThreadManager.js：
- src/app/PxerApp.js：

## Pxer的UI函数？位于/src/view

- src/view/analytics.js：
- src/view/AutoSuggestControl.js：
- src/view/vm.js：
