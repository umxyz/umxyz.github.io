<?php
$json_string = file_get_contents('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
$data = json_decode($json_string, true);
$url = 'https://cn.bing.com' . $data['images'][0]['url'];
header("Location: {$url}");
