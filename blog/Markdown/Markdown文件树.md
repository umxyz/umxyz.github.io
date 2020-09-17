# Markdown文件树

## 第一步

得到项目目录，使用windows+R组合键，调出命令行

## 第二步

cd 各种目录，进入到项目目录，tree /a 命令是查看粗略型的目录，tree /f  是查看详细的命令，两个命令的区别是，例如uploads是存储上传的文件的目录，tree /a 命令只显示一个uploads命令，而tree /f命令将显示uploads文件夹及其下的所有文件。

## 第三步

将这个文件，tree /a > tree.txt ，这个是的导出到此目录下的tree.txt目录，或者doc,pdf，md文件都可以导出，基本这三个格式够用了

## 第四步

现在大多数情况下，使用git的话，使用是md格式的README.md,对这个文件的编辑和markdown语法的预览，可以通过给编辑器安装markdown插件实现

