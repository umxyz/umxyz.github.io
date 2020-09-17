# [获取QQ头像地址不暴露QQ号](https://qqdie.com/archives/get-qq-avatar-no-qq-number.html)

## 需求

因为最近回归原生评论，所以评论头像如果单纯的引用gravatar头像，会有一部分low bee们头像会变成gravatar默认头像，为了解决这个问题，我想对于`qq号@qq.com`这样的邮箱地址就行个处理来提取QQ头像，然后问题是怎么获取QQ头像地址。

## 尝试

最初想到获取QQ头像地址就是下面这样

```html
https://q.qlogo.cn/g?b=qq&nk=腻的扣扣号&s=100
```

当随之而来的问题就是暴露了别人的QQ号码，这点对于保护他人隐私上来说不太好。

于是想到了这样的QQ头像地址

```html
https://q1.qlogo.cn/g?b=qq&k=0n5AZ9Ne4h3em8iboKu3sHg&s=100
```

上面的地址，中没有QQ号，却获取了某人的qq头像，里面的重要参数就是K的值，那么如何获取K值呢？

## 探索

上各种搜索利器，百度30分钟无果，必应一下就找到了线索。
访问下面的地址就能得到一个json

```html
http://ptlogin2.qq.com/getface?appid=101382166&imgtype=1&encrytype=0&devtype=0&keytpye=0&uin=扣扣号&r=0.17780657206333406
```

简化下无用参数，变成

```html
http://ptlogin2.qq.com/getface?&imgtype=1&uin=扣扣号
```

访问上述地址得到的json

```html
pt.setHeader({"扣扣号":"http:\/\/q3.qlogo.cn\/g?b=qq&k=对应的K值&s=40&t=1483323281"});
```

## 解决

知道怎么获取就好处理了，上全世界最好的语言php

```php
$qq = '你的扣扣号码';
$geturl = 'http://ptlogin2.qq.com/getface?&imgtype=1&uin='.$qq;
$qquser = file_get_contents($geturl);
$str1 = explode('&k=', $qquser);
$str2 = explode('&s=', $str1[1]);
$k = $str2[0];
$qqimg = 'https://q1.qlogo.cn/g?b=qq&k='.$k.'&s=100';
echo $qqimg
```

由于我php渣，不会解析json，所以用了个简单粗暴的方法来获取想要的字符串。

## 扩展typecho

typecho函数，其实和上边的php没啥区别。

```php
function  qqgravatar ($qq){
$geturl = 'http://ptlogin2.qq.com/getface?&imgtype=1&uin='.$qq;
$qquser = file_get_contents($geturl);
$str1 = explode('qq&k=', $qquser);
$str2 = explode('&s=', $str1[1]);
$k = $str2[0];
$qqimg = 'https://q1.qlogo.cn/g?b=qq&k='.$k.'&s=100';
return $qqimg;
}
```

需要提取qq头像地址时调用

```php
<?php echo qqgravatar('QQ号'); ?>
```

## 最后

Hran说影响效率，测试了下，有评论里有QQ头像的文章，加载确实慢了，所以，可能弃坑