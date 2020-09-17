# [CDN修复ERR SSL VERSION OR CIPHER MISMATCH错误](https://community.cloudflare.com/t/community-tip-fixing-err-ssl-version-or-cipher-mismatch-in-google-chrome/42162)

## 快速修复思路

1. *灰云/停用Cloudflare，以便网站使用来源的SSL证书*

- [如何暂时停用Cloudflare 405](https://support.cloudflare.com/hc/en-us/articles/200169176-How-do-I-temporarily-deactivate-Cloudflare)？
- 再次激活Cloudflare，然后尝试在24小时内再次访问您的网站，以查看SSL证书是否已成功部署

1. *重新开始程序*

- 转到Cloudflare仪表板上的SSL / TLS应用并向下滚动到底部
- 单击禁用通用SSL
- 等待几分钟，然后单击启用通用SSL

1. *了解证书的工作方式*
   证书将仅涵盖单个级别的子域（.example.com，但不包括*…example.com）：

- 将工作 - `www.example.com`
- 将工作 - `example.com`
- 将工作 - `test.example.com`
- 不管用 - `www.test.example.com`
- 不管用 - `staging.www.example.com`

1. *等待24小时，在大多数情况下，这是一个计时问题*