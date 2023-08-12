# GitHub Hosts

这个有什么用？最直观的效果是`GitHub`图片可以正常加载，网页也稳定了。

`GitHub Hosts`主要是通过修改`host`的方式加速`GitHub`访问，解决图片无法加载以及访问速度慢的问题。

- 主站: https://github.com/ineo6/hosts
- 镜像: https://gitlab.com/ineo6/hosts
- Github Pages: https://ineo6.github.io/hosts/

全新的`GitHub`访问加速工具，等待试用和反馈中，点击 [FastDev](https://github.com/ineo6/fast-dev) 直达。

特点就是稳定！

> `hosts`地址可能会调整，所以请务必关注GitHub、Gitlab主页，保证不迷路，也可以关注公众号：湖中剑。

另有`GitHub`加速的兄弟项目 [https://gh.idayer.com](https://gh.idayer.com)，支持对`GitHub`文件进行单独加速。

## 使用方式

### 1. 远程hosts

内容定时更新，最近更新时间：{update_time}。

```bash
{hostContent}
```

### 2. 本地 hosts 服务

本地 `hosts` 服务获取到的`ip`是经过本地测试，所以成功率较高。

而且会定时获取最新的`ip`，尽可能保证访问。

注意，该方案需要结合`SwitchHosts`一起使用，或者你也可以直接访问地址，手动复制。

#### macOS (Intel)

执行下面命令, 服务会运行在： http://localhost:8888

```bash
curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-mac-x64.tar.gz | tar xzvf -
xattr -d com.apple.quarantine ./hosts-server-pkg-mac-x64/hosts-server
./hosts-server-pkg-mac-x64/hosts-server --port=8888
```

#### macOS (Apple Silicon)

执行下面命令, 服务会运行在： http://localhost:8888

```bash
curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-mac-arm64.tar.gz | tar xzvf -
./hosts-server-pkg-mac-arm64/hosts-server --port=8888
```

#### Linux (x64, amd64)

执行下面命令, 服务会运行在： http://localhost:8888

```bash
curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-linuxstatic-x64.tar.gz | tar xzvf -
./hosts-server-pkg-linuxstatic-x64/hosts-server --port=8888
```

#### Linux (ARM64)

执行下面命令, 服务会运行在： http://localhost:8888

```bash
curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-linuxstatic-arm64.tar.gz | tar xzvf -
./hosts-server-pkg-linuxstatic-arm64/hosts-server --port=8888
```

#### Run on Linux (ARMv7 32bit)

执行下面命令, 服务会运行在： http://localhost:8888

```bash
curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-linuxstatic-armv7.tar.gz | tar xzvf -
./hosts-server-pkg-linuxstatic-armv7/hosts-server --port=8888
```

### Windows

下载 https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-win-x64.zip ，解压后执行下面命令，服务会运行在： http://localhost:8888

```bash
.\hosts-server.exe --port=8888
```

## 配置hosts教程

### 通过 SwitchHosts 自动更新

这里推荐使用 `SwitchHosts` 配置`hosts`，操作很简单，支持跨平台。

> 注意：首次使用先备份下本地hosts。

详细介绍可以阅读 [SwitchHosts! 还能这样管理hosts，后悔没早点用](https://mp.weixin.qq.com/s/A37XnD3HdcGSWUflj6JujQ) 。

#### 操作步骤

添加一条规则：

- 方案名：GitHub（可以自行命名）
- 类型：远程
- URL 地址：https://gitlab.com/ineo6/hosts/-/raw/master/hosts
- 自动更新：1个小时（时间可自行调整）

这样就可以和最新的`hosts`保持同步。

![switchhost-github.png](https://i.loli.net/2021/03/28/XnHW5xCEzel36fA.png)

### 手动配置

#### macOS

`hosts`文件位置：`/etc/hosts`。

`macOS`系统下修改需要按照如下方式：

##### 1：首先，打开（访达）Finder。

##### 2：使用组合键`Shift+Command+G`打开"前往文件夹"，输入框中输入`/etc/hosts`。

##### 3：然后就会跳转到`hosts`文件位置。

> 注意：如果你使用`VS Code`，可以直接用`VS Code`修改和保存，不需要复制文件。

复制`hosts`文件到桌面上，鼠标右键右击它，选择「打开方式」—「文本编辑」，打开这个`hosts`文件，把前面的`hosts`内容复制进来。

然后把你修改好的`hosts`文件替换掉：`/etc/hosts` 文件。

注意：如果弹出密码输入框，你需要输入你当前登录账号对应的密码。

最后刷新缓存：

```shell
sudo killall -HUP mDNSResponder
```

#### Windows

`hosts`文件位置：`C:/windows/system32/drivers/etc/hosts`。

将前文`hosts`内容追加到`hosts`文件，然后刷新`DNS`缓存：

```shell
ipconfig /flushdns
```

## 我的作品

- [GitMaster](https://github.com/ineo6/git-master)：开发者助手，代码仓库结构浏览器扩展
- [homebrew-install](https://github.com/ineo6/homebrew-install)：Homebrew快速安装教程和脚本
- [GitHub Hosts](https://github.com/ineo6/hosts)：GitHub最新hosts，定时更新
- [Awesome Mirror](https://github.com/ineo6/awesome-mirror)：镜像收集，旨在帮助你快速安装开发工具
- [mp-ci](https://github.com/ineo6/mp-ci)：微信小程序、小游戏发布助手（CI）
