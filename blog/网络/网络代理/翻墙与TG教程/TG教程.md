# TG 使用教程

## Table of Contents

- [1. Telegram 安装](#orgde94d01)
- [2. TG 是什么](#org0fb3db8)
- [3. 为什么使用TG](#orgd37e5aa)
- [4. TG 注册](#orgd9e92be)
- 5. TG 使用
  - [5.1. 设置中文](#orgdcdcf8a)
  - [5.2. 频道推荐](#org93fb0d7)
- [6. TG 常见问题](#org8c2f210)

## 1 Telegram 安装

[Telegram 官网](https://telegram.org/) ，可以在这里下载 TG 客户端

## 2 [TG 是什么](https://zh.wikipedia.org/wiki/Telegram)

> Telegram是跨平台的即时通讯软件，其客户端是自由及开放源代码软件，但服务器是专有软件。使用者可以相互交换加密与自毁讯息，传送相片、影片等所有类型档案。官方提供手机版（Android、iOS、Windows Phone）、桌面版（Windows、macOS、Linux）和网页版等多种平台用户端；同时官方开放应用程序接口（API），因此拥有许多第三方的客户端可供选择，其中多款内建中文。

请 ~~谨慎选择~~ （不要使用）第三方客户端，官方客户端也可以设置中文。

## 3 [为什么使用TG](https://medium.com/@HowardZhCn/为什么使用-telegram-e9d8b5fb618b)

由于政府审查和管制太多，像最近“宪法”等词开始敏感等，不得不设置代理使用国外的交流工具进行正常交流，尤其是敏感词比较多的交流。这很奇怪，在一个号称法治国的国度，居然不能讨论宪法。 技术上来说并不是国内的软件 low，而是国内的任何企业都是被动的，因为我国没有新闻法，想按宪法起诉都找不到受理部门或委员会。 对于国外软件的选择，相比之下 Telegram 的优势在于：

1. 官方客户端开源，简洁轻量无广告，跨各个平台。另外还有很多优秀的第三方客户端。开源就意味着开放所有的代码，没有办法作恶，让人放心。个人认为开源是最有诚意的行为，并且有好多开源项目实现盈利。
2. 匿名。注册可以无 ID，改名后谁也不知道你原来是谁。需要用手机号注册，不过好多人用虚拟号码注册的，这样会更隐蔽。
3. 和 WhatsApp 或 Signal 同样有端到端加密功能，级别最高。这个功能国内任何主流软件都不支持的，因为只有你自己能查看的记录是不可能存在的，且不说政府要求，企业也不会自觉这么做。
4. 支持两步认证，就是除手机验证码登录外，再给账户增加一个密码保护。就算有人控制了你的手机号，没有密码也不能查看聊天记录。
5. 聊天显示发送和已读状态，有大量的 gif 图像和表情。
6. 支持群聊，WhatsApp 和 Signal 的群聊功能较弱。群聊可以指定一条消息回复。
7. 支持聊天记录保存在服务器（选择不启用端到端加密）或自己导出备份，QQ 服务器保存聊天记录是要收费的。
8. 支持频道订阅，也就是推送新闻什么的。
9. 支持机器人，任何人都可以自己做个机器人。这个功能很有意思的，现在一些群里都有各种机器人来管理，比如自动屏蔽说脏话的人，自动制作GIF 等。
10. 支持销毁账户。国内的任何主流软件都没有销毁功能，个人信息会被永远保存在服务器上。

以上引用 [为什么使用TG](https://medium.com/@HowardZhCn/为什么使用-telegram-e9d8b5fb618b)

我这里根据最近的情况补充一些，自从武汉肺炎到现在，相信大家已经感受到了共产党对大家言论的控制，包括在微博、微信、豆瓣、知乎上，随便给你删贴封号，解散群组，从 2020 年开始到现在，大家在网上发言都是提心吊胆的，还有很多人因为微信上的言论被黑皮抓走的，李文亮医生说：“一个健康的社会，不应该只有一种声音”。共产党却不让大家说话，中国国民级聊天软件微信又是共产党控制舆论和维稳的重要工具，有人甚至因为把头像换成李文亮医生而被黑皮打电话警告，这样一个共产党的监控软件，还留着干啥。

大家需要一个可以放心讨论的地方，可以有不同的声音，并且安全，不会因为自己用了什么头像，而被黑皮打电话警告，没有各种屏蔽词、敏感词，不会打出一堆看着非常奇怪的东西，不会因为自己在群里说了什么，而被解散群组（ **注意，TG 对儿童色情零容忍，发现会被解散群组** ），甚至被拘留，不会因为政府一声令下，公司就把你的隐私全都交出去了，我这里说的不是微信，共产党拿微信数据都是直接拿的，并不需要找腾讯要，我说的是推特，真的有太多人因为推特被抓去喝茶了。

大家可以放心的使用 TG ，但是 **一定要保护好自己的个人信息** ，TG 比起那个国产聊天软件是要安全太多，但是还是有一些大意泄露手机号（＋86 的中国手机号）的人被国宝抓到，在讲注册之前我会先讲一下使用 TG 的注意事项，请一定认真阅读，确保你不会泄露自己的信息。

## 4 TG 注册

注册前先说一下注册需要用到的手机号， 如果可以搞到如 google voice 号之类的虚拟手机号，就不要使用 +86 的中国手机号注册 TG。虽然目前还没出现 +86 手机号隐私设置任何人不可见还被找出来的（那些被抓去喝茶的都是隐私设置里公开手机号，并且手机号是＋86 的中国手机号），但是还是有风险的，比如说如果你不小心在隐私设置中公开了手机号，是虚拟号的话，国宝基本上没可能找到你，是中国手机号的话，基本上没可能找不到你。

没有 GV 号可以去淘宝买一个，10 块钱以内就能买到，可能有人担心买淘宝的 GV 号是否安全，这个担心并不是多余的，确实有安全隐患，但是这是最快并且最简单搞到虚拟手机号的办法了，虽然有安全隐患，但是比起用 +86 手机号注册 TG，用虚拟号的安全隐患要低的多，淘宝购买 GV 虚拟号时，请虚构一个收获地址信息，收货人，收货地址，手机号都虚构一下。如果有亲戚、朋友、同学在国外的可以请他们帮忙接码注册 GV 号，这样就能进一步降低风险了。

关于如何注册使用 GV 号，可以过墙后自行搜索学习，这里我不展开了，我这里主要说一下如何续号，一段时间不用 GV 号， Google 可能就会回收 GV 号，避免这种事发生的方法有两种，一种是充钱，还一种方法就是定期用 GV 号发送短信或者打电话，我这里推荐定期给 (833)672-1001 ，这个号码发送一条短信，短信内容如 **qq.com** 这种，发送这条短信是免费的。

现在开始讲 TG 注册，其实很简单，打开 TG 客户端，会让你输入手机号，下一步，会给你的手机发验证码，输入验证码后，就注册并且登录上 TG 了，首次登录会让你填写用户名，设置头像，之后每次登录都是这个流程，输入手机号，收验证码，输入验证码，当然这些操作都需要翻墙完成，否则收不到验证码。

如果你只是需要一个临时 TG 号，可以去免费接码平台，接码注册 TG，注意公共接码平台的验证码大家都可以看到的，这种帐号大家都可以登录的，使用时一定不要留下任何可能暴露自己身份的信息。

这里还是说一下注意事项：

1. 注册登录后，第一件事一定去设置自己的安全隐私，这事非常重要，如果英文不好，可以点 [此链接](https://t.me/setlanguage/classic-zh-cn) 来安装中文包。因为这部分非常重要，所以设置部分有中英文对照。![lice 1.png](../../../#ImageAssets/lice%201.png)![lice 1 2.png](../../../#ImageAssets/lice%201%202.png)手机号设置为所有人不可见。![lice 1 3.png](../../../#ImageAssets/lice%201%203.png)通话设置为不允许任何人打电话，避免国宝给你打电话的时候，你手一抖接通了，![lice 1 4.png](../../../#ImageAssets/lice%201%204.png)隐私设置比较重要的就是这两项，其他的设置也请按照截图中的来设置，我这里就不一一截图了。
2. 如果有陌生人和你聊天，并且套你的个人信息，一定要提高警惕，不要告诉他任何有关个人的信息。
3. 不要把 TG 里看到的信息直接发到 QQ 或微信中，尽量做到墙内外两边的身份相互隔绝，如果非常想发的话，亲自处理加工一下再发。

## 5 TG 使用

这部分我会教大家如何给 TG 客户端设置中文，并分享一些常用的 TG 频道，有了这些相信能让大家更快的上手 TG 。

### 5.1 设置中文

TG语言包，点击安装。

简体中文

- 版本一：https://t.me/setlanguage/classic-zh-cn
- 版本二：https://t.me/setlanguage/zhlangcn
- 版本三：https://t.me/setlanguage/zh-hans-beta

繁体中文 (台湾)

- 版本一：https://t.me/setlanguage/taiwan
- 版本二：https://t.me/setlanguage/zh-hant-beta
- 魔法师：https://t.me/setlanguage/encha

繁体中文 (香港)

- 版本一：https://t.me/setlanguage/hongkong
- 版本二：https://t.me/setlanguage/zhhant-hk

### 5.2 频道推荐

TG 频道索引机器人，有了这个机器人，你从中找到更多自己想加入的频道和群组

- [hao1234bot](https://t.me/hao1234bot)

资讯类的频道，其实有很多，这里主要推荐这几个订阅人数多的资讯频道：

- [电报时报](https://t.me/times001)
- [猪圈净化快讯](https://t.me/zhujuan2018)
- [TG论坛:开放,包容,人文关怀](https://t.me/bbscn)

分享 TG 使用和安全上网的频道：

- [TGgeek | TG极客](https://t.me/TGgeek)
- [安全上网,注意事项](https://t.me/anquanshangwang)

这部分为免费分享节点的频道:

- [SSR节点免费发放](https://t.me/ssrList)
- [V2ray,Vmess节点免费发放](https://t.me/V2List)
- [SS节点公益发放](https://t.me/ssList)
- [SSR节点国际共享](https://t.me/ShadowsocksRssr)
- [SSR免费公益节点](https://t.me/FreeSSRNode)

我这里不推荐太多了，只推荐一些 TG 中文圈比较实用的频道，更多频道和群组还请亲自使用 [hao1234bot](https://t.me/hao1234bot) 去搜索

## 6 TG 常见问题

部分功能和操作可能会随着 Telegram 版本更新而发生变化，请以最新版本为准，TG极客 [@TGgeek](https://t.me/TGgeek) 会随着版本更新修订部分内容。

更新时间: 2020.01.01

- [Telegram 中文汉化](https://t.me/TGgeek/140)
- [如何创建自己的 Telegram 翻译版本](https://t.me/TGgeek/327)
- [如何选择 Telegram 客户端？第三方 Telegram可信任吗](https://t.me/TGgeek/360)
- [+86 解除私聊限制的操作(文字教程)](https://t.me/TGgeek/22)
- [+86 解除私聊限制的操作(动图演示)](https://t.me/TGgeek/96)
- [为什么+86手机号会默认禁止私聊](https://t.me/TGgeek/101)
- [发消息不成功并且消息右下角有红色感叹号](https://t.me/TGgeek/163)
- [如果发送骚扰消息会有惩罚吗](https://t.me/TGgeek/168)
- [如何重新进入被ban的群组](https://t.me/TGgeek/244)
- [浏览了一些群组和频道后，无法打开群组和频道的链接](https://t.me/TGgeek/364)
- [设置花体字母/空白名称](https://t.me/TGgeek/188)
- [设置空白个人资料](https://t.me/TGgeek/152)
- [如何做一个"隐藏身份"的隐形管理员](https://t.me/TGgeek/404)
- [Telegram 有VIP会员吗](https://t.me/TGgeek/278)
- [TG用户名是什么，怎么设置](https://t.me/TGgeek/42)
- [修改用户名或者群组ID有次数限制吗](https://t.me/TGgeek/167)
- [如果我想使用的用户名已被占用怎么办](https://t.me/TGgeek/403)
- [如何设置两步验证密码](https://t.me/TGgeek/40)
- [两步验证密码忘记怎么办](https://t.me/TGgeek/366)
- [如何添加他人至联系人](https://t.me/TGgeek/267)
- [添加非手机号码联系人后，对方能知道自己的手机号码吗](https://t.me/TGgeek/279)
- [Telegram 账号的 id 介绍](https://t.me/TGgeek/435)
- [Telegram账号的"数字id"是注册时间越晚就越大吗](https://t.me/TGgeek/304)
- [如何判断某用户是真的"已注销(Deleted Account)"还是改了昵称和头像的假"注销"](https://t.me/TGgeek/291)
- [使用Telegram Desktop 桌面版解锁 iOS 色情群组浏览限制](https://t.me/TGgeek/461)
- [iOS设备不能访问群组或频道，显示 "This group/channel is blocked because it was used to spread pornograhic content."](https://t.me/TGgeek/178)
- [任意设备上都不能访问某群组或频道，显示"sorry,this channel is not accessible."](https://t.me/TGgeek/177)
- [Telegram Desktop 桌面版清理本地文件夹，设置本地缓存上限](https://t.me/TGgeek/378)
- [我的群组被官方警告，怎么解除iOS访问限制](https://t.me/TGgeek/46)
- [我能创建几个群组和频道](https://t.me/TGgeek/281)
- [如何转移群组/频道所有权](https://t.me/TGgeek/270)
- [群组和频道能设置多少管理员](https://t.me/TGgeek/127)
- [Telegram 群组如何开启全员禁言](https://t.me/TGgeek/245)
- [查看公开群组/公开频道的创建日期](https://t.me/TGgeek/220)
- [创建匿名投票和实名投票](https://t.me/TGgeek/381)
- [如何撤回投票/更换投票](https://t.me/TGgeek/192)
- [Telegram 发送文字超链接](https://t.me/TGgeek/391)
- [有群组和频道显示"转发X个群，查看完整内容"是怎么回事](https://t.me/TGgeek/392)
- [不登陆TG查看公开频道](https://t.me/TGgeek/216)
- [管理员权限的特点](https://t.me/TGgeek/85)
- [如何自定义管理员头衔](https://t.me/TGgeek/293)
- [为什么很多色情群组中的群主都是已删除账户](https://t.me/TGgeek/104)
- [如何在PC桌面版登陆多个账号](https://t.me/TGgeek/75)
- [为什么有些机器人可以添加到群组，而有些不行](https://t.me/TGgeek/297)
- [如何发送定时消息和提醒](https://t.me/TGgeek/322)
- [如何将他人的语音发送成自己的语音](https://t.me/TGgeek/353?single)
- [Telegram 如何进入 Debug 菜单](https://t.me/TGgeek/324)
- [Telegram iOS 的 Debug 菜单中 Keep Chat Stack 功能介绍](https://t.me/TGgeek/325)
- [谁能看到我"在线"](https://t.me/TGgeek/214)
- [创建属于自己的私聊Bot](https://t.me/TGgeek/197)
- [我能创建多少个机器人](https://t.me/TGgeek/419)
- [机器人的 inline 模式是什么](https://t.me/TGgeek/421)
- [使用 inline 模式实时翻译输入的内容](https://t.me/TGgeek/437)
- [Telegram 跨平台自定义云主题](https://t.me/TGgeek/337)
- [Telegram 在线主题编辑器](https://t.me/TGgeek/349)
- [Telegram 主题频道](https://t.me/TGgeek/394)
- [Telegram 服务条款](https://t.me/TGgeek/386)
- [注销TG账号](https://t.me/TGgeek/139)