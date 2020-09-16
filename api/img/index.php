<?php
$img_array1 = glob('wallpaper/pc/images/*.{gif,jpg,png,jpeg,webp,bmp}', GLOB_BRACE);
$img_array2 = glob('wallpaper/mp/images/*.{gif,jpg,png,jpeg,webp,bmp}', GLOB_BRACE);
$img_array = array_merge($img_array1, $img_array2);
if (!count($img_array)) die('没找到图片文件。请先上传一些图片到文件夹');
header('Content-Type: image/png');
echo (file_get_contents($img_array[array_rand($img_array)]));