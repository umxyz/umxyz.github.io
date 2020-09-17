# ffmepg转码参数

```shell
ffmpeg -hwaccel cuvid -c:v hevc_cuvid -i "" -c:a copy -c:s copy -c:v hevc_nvenc "e:\temp\.mp4"
```

```shell
ffmpeg -i "" -c:a copy -c:s copy -c:v hevc_nvenc "e:\temp\.mp4"
```

