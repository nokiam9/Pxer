# TM插件对DOM的修改

## UI控件

位于`<body>`的顶部，id=pxerapp，class=pxer-app（对应css的style设置）

``` html
<div id="pxerApp" class="pxer-app">
    <div class="pxer-nav">
        <div class="pn-header"><a href="http://pxer.pea3nut.org/" target="_blank">Pxer <small>2021.12.5</small></a></div> 
        <div class="pn-buttons">
            <div class="pnb-progress" style="display: none;"><span>- / </span></div> 
            <button class="btn btn-outline-info" style="display: none;">设置</button> 
            <button class="btn btn-outline-success">载入</button> 
        </div>
    </div> 
</div>
```

## script代码

位于`</body>`结束之后，延迟加载js代码

``` html
<script src="https://pxer-app.pea3nut.org/launcher.js?1651458509225"></script>
<script src="https://127.0.0.1:8125/src/launcher.js?1651458514865"></script>
<script src="https://127.0.0.1:8125/src/local.js?pxer-version=2021.12.5"></script>
```

## style参数

也在`</body>`结束之后，style定义了一堆css配置，名称是pxer-app
有5000多行，冒汗！
