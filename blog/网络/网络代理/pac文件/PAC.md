# 代理自动配置文件（PAC）文件

**代理自动配置（PAC）**文件是一个 JavaScript 脚本，其核心是一个 JavaScript 函数，用来决定网页浏览请求（HTTP、HTTPS，和 FTP）应当直连目标地址，还是被转发给一个网页代理服务器并通过代理连接。PAC 文件中的核心 JavaScript 函数通常是这样定义的：

```js
function FindProxyForURL(url, host) {
  // ...
}
```

## 语法

```
function FindProxyForURL(url, host)
```

### 参数



- `url`

  要访问的 URL。类似 `https://` 这样的 URL 中的路径和查询组件已被去除。在 Chrome 浏览器中, 你可以通过设置 `PacHttpsUrlStrippingEnabled` 为 `false` 来禁止这种行为；在 Firefox 浏览器中，对应的选项是 `network.proxy.autoconfig_url.include_path`。

- `host`

  从 URL 中提取得到的主机名。这只是为了方便；它与 `://` 之后到第一个 `:` 或 `/` 之前的字符串相同。端口号不包括在此参数中，必要时可以自行从 URL 中提取。

## 描述

返回一个描述了代理设置的字符串。字符串的格式按照返回值格式进行定义。

### 返回值格式



- `FindProxyForURL()` 函数返回一个字符串
- 如果那个字符串为空，则不使用任何代理
- 字符串中可以包含如下任意数量的“代理配置块”（building blocks），用分号分隔：

- `DIRECT`

  直连，不经过任何代理

- `PROXY *host:port*`

  HTTP 代理

- `SOCKS *host:port*`

  SOCKS 代理

最近版本的 Firefox 同时还支持：

- `HTTP *host:port*`

  HTTP 代理

- `HTTPS *host:port*`

  HTTPS 代理

- `SOCKS4 *host:port*`

- `SOCKS5 *host:port*`

  SOCKS 代理（同时指定 SOCKS 版本）

如果有多个使用分号分隔的代理配置，将使用最左边的配置，除非 Firefox 无法与其中指定的代理服务器建立连接。在这种情况下，将使用下一个配置，等等。

30分钟后，浏览器将自动重试之前没有响应的代理。下一次尝试则将在一小时后开始，再下一次是一个半小时。每次尝试后，间隔会增加 30 分钟。

如果所有代理都挂了，并且最后没有指定直连配置项（`DIRECT`），浏览器将询问是否应该暂时忽略代理，并尝试直接连接。20 分钟后，浏览器会再次询问是否应该重试代理，40 分钟后会再问一次。每次询问后，间隔会增加 20 分钟。

#### 例子

- `PROXY w3proxy.netscape.com:8080; PROXY mozilla.netscape.com:8081`

  主代理是 `w3proxy:8080`；如果它出现故障，则使用 `mozilla:8081`，直到主代理恢复。

- `PROXY w3proxy.netscape.com:8080; PROXY mozilla.netscape.com:8081; DIRECT`

  和上面的基本一样，但如果两个代理都挂了，则自动改为直连。（在上面的例子中，Netscape 浏览器将询问用户是否要改用直接连接；在本例中，则不需要用户干预。）

- `PROXY w3proxy.netscape.com:8080; SOCKS socks:1080`

  如果主代理出现问题，则使用 SOCKS 连接。

自动配置文件应当被保存为一个以 .pac 作为文件拓展名的文件，比如：

```
proxy.pac
```

其 MIME 类型应被设置为：

```
application/x-ns-proxy-autoconfig
```

接下来，你应当配置你的服务器，让文件拓展名 .pac 映射到如上所示的 MIME 类型。

**注意：**

- PAC 文件的 JavaScript 代码应该总是单独保存到 .pac 文件中，而不是嵌入到 HTML 文件或是任何其他文件之中。
- The examples at the end of this document are complete. There is no additional syntax needed to save it into a file and use it. (Of course, the JavaScripts must be edited to reflect your site's domain name and/or subnets.)

## 预定义的函数与环境

这些函数可以在 PAC 文件中使用：

- 基于主机名的判断函数
  - `isPlainHostName()`
  - `dnsDomainIs()`
  - `localHostOrDomainIs()`
  - `isResolvable()`
  - `isInNet()`
- 和代理相关的功能函数
  - `dnsResolve()`
  - `convert_addr()`
  - `myIpAddress()`
  - `dnsDomainLevels()`
- 基于 URL 或主机名的判断函数
  - `shExpMatch()`
- 基于时间的判断函数
  - `weekdayRange()`
  - `dateRange()`
  - `timeRange()`
- 日志记录功能函数
  - `alert()`
- 同时，还定义了一个关联数组（associative array），因为 JavaScript 目前无法自行定义它们：
  - `ProxyConfig.bindings`

**注意：** pactester (part of the [pacparser ](https://github.com/pacparser/pacparser)package) was used to test the following syntax examples.

- The PAC file is named proxy.pac

- Command line:

   

  ```
  pactester -p ~/pacparser-master/tests/proxy.pac -u http://www.mozilla.org
  ```

  - This command passes the `host` parameter `www.mozilla.org` and the `url` parameter `http://www.mozilla.org`.

### `isPlainHostName()`



#### 语法

```
isPlainHostName(host)
```

#### 参数

- host

  从 URL 中得到的主机名（端口除外）。

#### 描述

当且仅当主机名中没有域名时为真（没有分隔域名的点）。

#### 例子

```js
isPlainHostName("www.mozilla.org") // false
isPlainHostName("www") // true
```

### `dnsDomainIs()`



#### 语法

```
dnsDomainIs(host, domain)
```

#### 参数

- host

  从 URL 中得到的主机名。

- domain

  Is the domain name to test the hostname against.

#### 描述

Returns true if and only if the domain of hostname matches.

#### 例子

```js
dnsDomainIs("www.mozilla.org", ".mozilla.org") // true
dnsDomainIs("www", ".mozilla.org") // false
```

### `localHostOrDomainIs()`



#### 语法

```
localHostOrDomainIs(host, hostdom)
```

#### 参数

- host

  从 URL 中得到的主机名。

- hostdom

  Fully qualified hostname to match against.

#### 描述

Is true if the hostname matches exactly the specified hostname, or if there is no domain name part in the hostname, but the unqualified hostname matches.

#### 例子

```js
localHostOrDomainIs("www.mozilla.org" , "www.mozilla.org") // true (exact match)
localHostOrDomainIs("www"             , "www.mozilla.org") // true (hostname match, domain not specified)
localHostOrDomainIs("www.google.com"  , "www.mozilla.org") // false (domain name mismatch)
localHostOrDomainIs("home.mozilla.org", "www.mozilla.org") // false (hostname mismatch)
```

### `isResolvable()`



#### 语法

```
isResolvable(host)
```

#### 参数

- host

  从 URL 中得到的主机名。

Tries to resolve the hostname. Returns true if succeeds.

#### 例子：

```js
isResolvable("www.mozilla.org") // true
```

### `isInNet()`



#### 语法

```
isInNet(host, pattern, mask)
```

#### 参数

- host

  一个 DNS 主机名，或者一个 IP 地址。如果传入了主机名，则会被此函数解析为 IP 地址，再进行判断。

- pattern

  an IP address pattern in the dot-separated format.

- mask

  mask for the IP address pattern informing which parts of the IP address should be matched against. 0 means ignore, 255 means match.

True if and only if the IP address of the host matches the specified IP address pattern.

Pattern and mask specification is done the same way as for SOCKS configuration.

#### 例子：

```js
function alert_eval(str) { alert(str + ' is ' + eval(str)) }
function FindProxyForURL(url, host) {
  alert_eval('isInNet(host, "63.245.213.24", "255.255.255.255")')
  // "PAC-alert: isInNet(host, "63.245.213.24", "255.255.255.255") is true"
}
```

### `dnsResolve()`



```
dnsResolve(host)
```

#### 参数

- host

  要解析的主机名。

将给定的 DNS 主机名解析为 IP 地址并返回为标准格式的 IP 地址字符串。

#### 例子

```js
dnsResolve("www.mozilla.org"); // returns the string "104.16.41.2"
```

### `convert_addr()`



#### 语法

```
convert_addr(ipaddr)
```

#### 参数

- ipaddr

  Any dotted address such as an IP address or mask.

Concatenates the four dot-separated bytes into one 4-byte word and converts it to decimal.

#### 例子

```js
convert_addr("104.16.41.2"); // returns the decimal number 1745889538
```

### `myIpAddress()`



#### 语法

```
myIpAddress()
```

#### 参数

**（无）**

获取当前 Firefox 所在设备的 IP 地址，并返回为标准格式的 IP 地址字符串。

myIpAddress() returns the same IP address as the server address returned by **`nslookup localhost`** on a Linux machine. It does not return the public IP address.

#### 例子

```js
myIpAddress() //returns the string "127.0.1.1" if you were running Firefox on that localhost
```

### `dnsDomainLevels()`



#### 语法

```
dnsDomainLevels(host)
```

#### 参数

- host

  从 URL 中得到的主机名。

Returns the number (integer) of DNS domain levels (number of dots) in the hostname.

#### 例子：

```js
dnsDomainLevels("www");             // 0
dnsDomainLevels("mozilla.org");     // 1
dnsDomainLevels("www.mozilla.org"); // 2
```

### shExpMatch()



#### 语法

```
shExpMatch(str, shexp)
```

#### 参数

- str

  is any string to compare (e.g. the URL, or the hostname).

- shexp

  is a shell expression to compare against.

Returns true if the string matches the specified shell expression.

**Note that the patterns are \*shell\* glob \*expressions\*, not regular expressions. `\*` and `?` are always supported, while `[characters]` and `[^characters]` are supported by some implmentations including Firefox. This is mainly because the expression is translated to a RegExp via subsitution of `[.\*?]`.**

#### 例子

```js
shExpMatch("http://home.netscape.com/people/ari/index.html"     , "*/ari/*"); // returns true
shExpMatch("http://home.netscape.com/people/montulli/index.html", "*/ari/*"); // returns false
```

### `weekdayRange()`



#### 语法

```
weekdayRange(wd1, wd2, [gmt])
```

**注意：** (Before Firefox 49) `wd1` must be less than `wd2` if you want the function to evaluate these parameters as a range. See the warning below.

#### 参数

- wd1 和 wd2

  One of the ordered weekday strings:

- `"SUN"|"MON"|"TUE"|"WED"|"THU"|"FRI"|"SAT"`

- gmt

  可以指定为字符串 "`GMT`"，或留白不指定。

Only the first parameter is mandatory. Either the second, the third, or both may be left out.

If only one parameter is present, the function returns a value of true on the weekday that the parameter represents. If the string "GMT" is specified as a second parameter, times are taken to be in GMT. Otherwise, they are assumed to be in the local timezone.

If both **wd1** and **wd1** are defined, the condition is true if the current weekday is in between those two *ordered* weekdays. Bounds are inclusive, *but the bounds are ordered*. 如果指定了 "`GMT`" 参数，则使用 GMT 时区，否则使用浏览器获取到的平台本地时区。

**The order of the days matters**; Before Firefox 49, `weekdayRange("*SUN", "SAT"*)` will always evaluate to true. Now `weekdayRange("*WED", "SUN"*)` will only evaluate true if the current day is Wednesday or Sunday.

#### 例子

```js
weekdayRange("MON", "FRI");        // returns true Monday through Friday (local timezone)
weekdayRange("MON", "FRI", "GMT"); // returns true Monday through Friday (GMT timezone)
weekdayRange("SAT");               // returns true on Saturdays local time
weekdayRange("SAT", "GMT");        // returns true on Saturdays GMT time
weekdayRange("FRI", "MON");        // returns true Friday and Monday only (note, order does matter!)
```

### `dateRange()`



#### 语法

```
dateRange(<day> | <month> | <year>, [gmt])  // ambiguity is resolved by assuming year is greater than 31
dateRange(<day1>, <day2>, [gmt])
dateRange(<month1>, <month2>, [gmt])
dateRange(<year1>, <year2>, [gmt])
dateRange(<day1>, <month1>, <day2>, <month2>, [gmt])
dateRange(<month1>, <year1>, <month2>, <year2>, [gmt])
dateRange(<day1>, <month1>, <year1>, <day2>, <month2>, <year2>, [gmt])
```

**注意：** (Before Firefox 49) day1 must be less than day2, month1 must be less than month2, and year1 must be less than year2 if you want the function to evaluate these parameters as a range. See the warning below.

#### 参数

- day

  Is the ordered day of the month between 1 and 31 (as an integer).

```
1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31
```

- month

  Is one of the ordered month strings below.

```
"JAN"|"FEB"|"MAR"|"APR"|"MAY"|"JUN"|"JUL"|"AUG"|"SEP"|"OCT"|"NOV"|"DEC"
```

- year

  Is the ordered full year integer number. For example, 2016 (**not** 16).

- gmt

  可以指定为字符串 "`GMT`"，代表使用 GMT 时区进行比较；或者留白不指定，代表使用浏览器获取到的平台本地时区。

If only a single value is specified (from each category: day, month, year), the function returns a true value only on days that match that specification. If both values are specified, the result is true between those times, including bounds, *but the bounds are ordered*.

**The order of the days, months, and years matter**; Before Firefox 49, `dateRange("*JAN", "DEC"*)` will always evaluate to `true`. Now `dateRange("*DEC", "JAN"*)` will only evaluate true if the current month is December or January.

#### 例子

```js
dateRange(1);            // returns true on the first day of each month, local timezone
dateRange(1, "GMT")      // returns true on the first day of each month, GMT timezone
dateRange(1, 15);        // returns true on the first half of each month
dateRange(24, "DEC");    // returns true on 24th of December each year
dateRange("JAN", "MAR"); // returns true on the first quarter of the year

dateRange(1, "JUN", 15, "AUG");
// returns true from June 1st until August 15th, each year
// (including June 1st and August 15th)

dateRange(1, "JUN", 1995, 15, "AUG", 1995);
// returns true from June 1st, 1995, until August 15th, same year

dateRange("OCT", 1995, "MAR", 1996);
// returns true from October 1995 until March 1996
// (including the entire month of October 1995 and March 1996)

dateRange(1995);
// returns true during the entire year of 1995

dateRange(1995, 1997);
// returns true from beginning of year 1995 until the end of year 1997
```

### `timeRange()`



#### 语法

```
// The full range of expansions is analogous to dateRange.
timeRange(<hour1>, <min1>, <sec1>, <hour2>, <min2>, <sec2>, [gmt])
```

**注意：** (Before Firefox 49) the category hour1, min1, sec1 must be less than the category hour2, min2, sec2 if you want the function to evaluate these parameters as a range. See the warning below.

#### 参数

- hour

  小时，区间为 0 到 23。（0 是午夜 0 点，1 是上午 1 点，11 是正午 12 点，23 是下午 11 点。）

- min

  分钟，区间为 0 到 59。

- sec

  　秒，区间为 0 到 59。

- gmt

  可以指定为字符串 "`GMT`"，代表使用 GMT 时区，或者留白不指定，代表使用浏览器获取到的平台本地时区。

If only a single value is specified (from each category: hour, minute, second), the function returns a true value only at times that match that specification. If both values are specified, the result is true between those times, including bounds, *but the bounds are ordered*.

**The order of the hour, minute, second matter**; Before Firefox 49, `timeRange(*0, 23*)` will always evaluate to true. Now `timeRange(*23, 0*)` will only evaluate true if the current hour is 23:00 or midnight.

#### 例子

```js
timerange(12);                // returns true from noon to 1pm
timerange(12, 13);            // returns true from noon to 1pm
timerange(12, "GMT");         // returns true from noon to 1pm, in GMT timezone
timerange(9, 17);             // returns true from 9am to 5pm
timerange(8, 30, 17, 00);     // returns true from 8:30am to 5:00pm
timerange(0, 0, 0, 0, 0, 30); // returns true between midnight and 30 seconds past midnight
```

## 例 1

### 对除本地主机以外的所有连接使用代理



**注意：** Since all of the examples that follow are very specific, they have not been tested.

All hosts which aren't fully qualified, or the ones that are in local domain, will be connected to directly. Everything else will go through w3proxy:8080. If the proxy goes down, connections become direct automatically:

```js
function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".mozilla.org")) {
    return "DIRECT";
  } else {
    return "PROXY w3proxy.mozilla.org:8080; DIRECT";
  }
}
```

**注意：** This is the simplest and most efficient autoconfig file for cases where there's only one proxy.

## 例 2

### 和例 1 一样，但是 use proxy for local servers which are outside the firewall



If there are hosts (such as the main Web server) that belong to the local domain but are outside the firewall and are only reachable through the proxy server, those exceptions can be handled using the `localHostOrDomainIs()` function:

```js
function FindProxyForURL(url, host) {
  if (
    (isPlainHostName(host) || dnsDomainIs(host, ".mozilla.org")) &&
    !localHostOrDomainIs(host, "www.mozilla.org") &&
    !localHostOrDoaminIs(host, "merchant.mozilla.org")
  ) {
        return "DIRECT";
  } else {
    return "PROXY w3proxy.mozilla.org:8080; DIRECT";
  }
}
```

The above example will use the proxy for everything except local hosts in the mozilla.org domain, with the further exception that hosts `www.mozilla.org` and `merchant.mozilla.org` will go through the proxy.

**Note** the order of the above exceptions for efficiency: localHostOrDomainIs() functions only get executed for URLs that are in local domain, not for every URL. Be careful to note the parentheses around the *or* expression before the *and* expression to achieve the above-mentioned efficient behaviour.

## 例 3

### 如果无法解析域名，则使用代理



This example will work in an environment where the internal DNS server is set up so that it can only resolve internal host names, and the goal is to use a proxy only for hosts that aren't resolvable:

```js
function FindProxyForURL(url, host) {
  if (isResolvable(host))
    return "DIRECT";
  else
    return "PROXY proxy.mydomain.com:8080";
}
```

The above requires consulting the DNS every time; it can be grouped intelligently with other rules so that DNS is consulted only if other rules do not yield a result:

```js
function FindProxyForURL(url, host) {
  if (
    isPlainHostName(host) ||
    dnsDomainIs(host, ".mydomain.com") ||
    isResolvable(host)
  ) {
    return "DIRECT";
  } else {
    return "PROXY proxy.mydomain.com:8080";
  }
}
```

## 例 4

### 基于网域（Subnet）的选择方案



In this example all of the hosts in a given subnet are connected-to directly, others are connected through the proxy:

```js
function FindProxyForURL(url, host) {
  if (isInNet(host, "198.95.0.0", "255.255.0.0"))
    return "DIRECT";
  else
    return "PROXY proxy.mydomain.com:8080";
}
```

Again, use of the DNS server in the above can be minimized by adding redundant rules in the beginning:

```js
function FindProxyForURL(url, host) {
  if (
    isPlainHostName(host) ||
    dnsDomainIs(host, ".mydomain.com") ||
    isInNet(host, "198.95.0.0", "255.255.0.0")
  ) {
    return "DIRECT";
  } else {
    return "PROXY proxy.mydomain.com:8080";
  }
}
```

## 例 5

### 负载均衡 / 基于 URL 模式（pattern）的路由规划



This example is more sophisticated. There are four (4) proxy servers; one of them is a hot stand-by for all of the other ones, so if any of the remaining three goes down the fourth one will take over. Furthermore, the three remaining proxy servers share the load based on URL patterns, which makes their caching more effective (there is only one copy of any document on the three servers - as opposed to one copy on each of them). The load is distributed like this:

| Proxy | 用途                                         |
| :---- | :------------------------------------------- |
| #1    | .com 域名                                    |
| #2    | .edu 域名                                    |
| #3    | 所有其他域名                                 |
| #4    | 备用（原文：hot stand-by，活跃备用、热备用） |

All local accesses are desired to be direct. All proxy servers run on the port 8080 (they don't need to, you can just change your port but remember to modify your configuations on both side). Note how strings can be concatenated with the `**+**` operator in JavaScript.

```js
function FindProxyForURL(url, host) {

  if (isPlainHostName(host) || dnsDomainIs(host, ".mydomain.com"))
    return "DIRECT";

  else if (shExpMatch(host, "*.com"))
    return "PROXY proxy1.mydomain.com:8080; " +
           "PROXY proxy4.mydomain.com:8080";

  else if (shExpMatch(host, "*.edu"))
    return "PROXY proxy2.mydomain.com:8080; " +
           "PROXY proxy4.mydomain.com:8080";

  else
    return "PROXY proxy3.mydomain.com:8080; " +
           "PROXY proxy4.mydomain.com:8080";
}
```

## 例 6

### 为特定协议设置代理



Most of the standard JavaScript functionality is available for use in the `FindProxyForURL()` function. As an example, to set different proxies based on the protocol the [`startsWith()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) function can be used:

```js
function FindProxyForURL(url, host) {

  if (url.startsWith("http:"))
    return "PROXY http-proxy.mydomain.com:8080";

  else if (url.startsWith("ftp:"))
    return "PROXY ftp-proxy.mydomain.com:8080";

  else if (url.startsWith(“gopher:"))
    return "PROXY gopher-proxy.mydomain.com:8080";

  else if (url.startsWith("https:") || url.startsWith("snews:"))
    return "PROXY security-proxy.mydomain.com:8080";

  else
    return "DIRECT";

}
```

**注意：** The same can be accomplished using the `shExpMatch()` function described earlier.

For example:

```js
// ...
if (shExpMatch(url, "http:*")) {
  return "PROXY http-proxy.mydomain.com:8080";
}
// ...
```

The autoconfig file can be output by a CGI script. This is useful, for example, when making the autoconfig file act differently based on the client IP address (the `REMOTE_ADDR` environment variable in CGI).

Usage of `isInNet()`, `isResolvable()` and `dnsResolve()` functions should be carefully considered, as they require the DNS server to be consulted. All the other autoconfig-related functions are mere string-matching functions that don't require the use of a DNS server. If a proxy is used, the proxy will perform its DNS lookup which would double the impact on the DNS server. Most of the time these functions are not necessary to achieve the desired result.

## 历史与实现

Proxy auto-config was introduced into Netscape Navigator 2.0 in the late 1990s, at the same time when JavaScript was introduced. Open-sourcing Netscape eventually lead to Firefox itself.

The most "original" implementation of PAC and its JavaScript libraries is, therefore, `nsProxyAutoConfig.js` found in early versions of Firefox. These utilities are found in many other open-source systems including Chromium. Firefox later integrated the file into `ProxyAutoConfig.cpp` as a string literal.

Microsoft in general made its own implementation. There used to be [some problems with their libraries](https://en.wikipedia.org/wiki/Proxy_auto-config#Old_Microsoft_problems), but most are resolved by now. They have defined [some new "Ex" suffixed functions](https://docs.microsoft.com/en-us/windows/win32/winhttp/ipv6-extensions-to-navigator-auto-config-file-format) around the address handling parts to support IPv6. The feature is supported by Chromium, but not yet by Firefox ([bugzilla #558253](https://bugzilla.mozilla.org/show_bug.cgi?id=558253)).