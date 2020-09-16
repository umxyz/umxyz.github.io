<?php
// https://www.cnblogs.com/HGNET/p/12376374.html
$path = 'bingsave';
$filename = date("Ymd") . '.jpg';
if (!file_exists($path . '/' . $filename)) {
    if (!file_exists($path)) {
        mkdir($path, 0777);
    }
    $str = file_get_contents('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
    $str = json_decode($str, true);
    $imgurl = 'https://cn.bing.com' . $str['images'][0]['url'];
    $img = grabImage($imgurl, $path . '/' . $filename);
}
function grabImage($url, $filename = "")
{
    if ($url == "") return false;
    if ($filename == "") {
        $ext = strrchr($url, ".");
        $filename = date("Ymd") . $ext;
    }
    ob_start();         //打开输出
    readfile($url);     //输出图片文件
    $img = ob_get_contents();   //得到浏览器输出
    ob_end_clean();             //清除输出并关闭
    $fp2 = @fopen($filename, "a");
    fwrite($fp2, $img);         //向当前目录写入图片文件，并重新命名
    fclose($fp2);
    return $filename;           //返回新的文件名
}
if (preg_match("/<url>(.+?)<\/url>/ies", $str, $matches)) {
    $imgurl = 'https://cn.bing.com' . $matches[1];
} else {
    $imgurl = './jump.php';
}
header("Location: {$imgurl}");
