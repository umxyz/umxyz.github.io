# 一个好看的html5下拉框

源码分享，找不到出处了

```html
<!DOCTYPE HTML>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>纯 CSS 多级菜单</title>
    <style>
        .menu {}
        
        .menu ul,
        .menu li {
            margin: 0;
            padding: 0;
            list-style: none outside;
        }
        
        .menu>ul {
            overflow: auto;
            display: inline-block;
        }
        
        .menu a,
        .menu span {
            cursor: default;
            height: 30px;
            line-height: 30px;
            padding: 0 5px;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            text-decoration: none;
            color: MenuText;
        }
        
        .menu a:hover,
        .menu span:hover,
        .menu li:hover>a,
        .menu li:hover>span {
            color: HighlightText;
        }
        
        .menu li:hover {
            /* background-color: Highlight; */
        }
        
        .menu li:hover>ul {
            display: block;
        }
        
        .menu>ul>li {
            float: left;
        }
        
        .menu>ul>li ul {
            display: none;
            float: left;
            background-color: #fff;
            /* border: 1px solid Highlight; */
            position: absolute;
        }
        
        .menu>ul>li li {
            padding-left: 25px;
            margin: 2px;
            background: transparent url(data:image/gif;base64,R0lGODlhEAAQAIAAAJmZmf///yH5BAAAAAAALAAAAAAQABAAAAIjhI9pwe2+nmRRIQrmjBrmYB1Y93Ak+IXVd6LtiIZwa5JqWAAAOw==) no-repeat 5px center;
            width: 150px;
        }
        
        .menu>ul>li>ul>li ul {
            margin-left: 140px;
            margin-top: -30px;
        }
        
        .menu li.expand>a,
        .menu li.expand>span {
            background: transparent url(data:image/png;base64,R0lGODlhAwAQAIABAAAAAP///yH5BAEAAAEALAAAAAADABAAAAIKjI8JBtv/wko0FQA7) no-repeat right center;
            padding-right: 10px;
            margin-right: 5px;
        }
        
        .menu>ul>li.expand>a,
        .menu>ul>li.expand>span {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAADCAYAAACwAX77AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAaSURBVBhXY2BgYPiPAwOFMSXBgjAA0wnmAwASVQv19UVKmwAAAABJRU5ErkJggg==);
        }
    </style>
</head>

<body>

    <div id="mainnav" class="menu">
        <ul>
            <li class="expand"><a href="#">Link</a>
                <ul>
                    <li><a href="#">Link</a></li>
                    <li class="expand"><a href="#">很长很长很长很长很长很长很长很长很长很长</a>
                        <ul>
                            <li><a href="#">Link</a></li>
                            <li><a href="#">Link</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

</body>

</html>
```

