###

这个项目是为了做一个适合自己的首页，加入了哈尔滨工业大学（深圳）的常用网站，所以也可以作为类似[北邮人导航](byr.wiki)的哈工深版。

demo 地址: [➡️ 造作家](https://www.hitsz.top/)

我的博客: [www.rhinoc.top](https://rhinoc.top/)

#### feature
[x] 根据JSON文件自动生成网页（目前支持`index.html`和`about.html`）
[x] 支持阿里巴巴iconfont
[x] 类地址栏搜索（有关类地址栏搜索下面会说明）
[ ] 搜索结果建议
[ ] 页面内搜索

欢迎PR～


#### generator.py 使用说明

直接运行即可。
JSON文件和头部尾部HTML文件都在同级目录下，根据自己需要修改。
写了一篇相关博文在我的博客里[「JSON-to-HTML」根据JSON文件信息生成静态导航网页](https://rhinoc.top/post/generator-py.html)

#### 类地址栏搜索说明

搜索引擎在`searchbar.js`中定义，下面是支持的搜索引擎：

```
bd 百度
db 豆瓣
zh 知乎
wx 微信
tb 淘宝
gh GitHub
gg Google
ddg DuckDuckGo
```

-------

### Fork From

> 这里是原版的说明，但由于我已经大刀阔斧地改了文件夹目录结构，所以下面👇的可能不适用，仅作参考。

[➡️ www.webstack.cc](https://webstack.cc) - 网址导航

这是一个纯静态的网址导航网站，内容均由[viggo](http://viggoz.com)收集并整理。项目基于bootstrap前端框架开发。

![](http://www.webstack.cc/assets/images/preview.gif)

这是一个开源的公益项目，你可以拿来制作自己的网址导航，也可以做与导航无关的网站。如果你有任何疑问，可以通过个人网站[viggoz.com](http://viggoz.com)中的联系方式找到我，欢迎与我交流分享。


如果你需要一个后台系统，可以按照我的后台框架设计自行搭建。本站设计开发过程在我的博客文章有详细讲到[《webstack \| viggo》](http://blog.viggoz.com/2018/01/03/2018-01-03-webstack/)。

后台静态源码：[webstack-Admin](https://github.com/WebStackPage/webstack-Admin)

关于图片资源
---
```/assets/images/logos/default.png``` 这是网站标签的默认图标

```/assets/images/logos``` 这里是所有网站内的图标切图，尺寸均为120px*120px

```/assets/webstack_logos.sketch``` 这是网站标签收录的所有图标设计源文件，你可以在这里[下载](https://WebStackPage.github.io/assets/webstack_logos.sketch) 。打开前请确认Sketch版本高于50.2(55047)

怎么用?
---
JUST DOWNLOAD AND DO WHAT THE FUCK YOU WANT TO.

License
---
Copyright © 2017-2018 **[webstack.cc](https://webstack.cc)**  Released under the **MIT License**.
> 注：本站开源的目的是大家能够在本站的基础之上有所启发，做出更多新的东西。并不是让大家照搬所有代码。
> 如果你使用这个开源项目，请**注明**本项目开源地址。
