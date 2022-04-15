# GitHub Hosts

这个有什么用？最直观的效果是`GitHub`图片可以正常加载，网页也稳定了。

`GitHub Hosts`主要是通过修改`host`的方式加速`GitHub`访问，解决图片无法加载以及访问速度慢的问题。

- 主站: https://github.com/ineo6/hosts
- 镜像地址: https://gitee.com/ineo6/hosts

## 使用方式

### hosts

内容定时更新，最近更新时间：2022-04-15 18:13:53。

```bash
# GitHub Host Start

185.199.108.154              github.githubassets.com
140.82.113.21                central.github.com
185.199.108.133              desktop.githubusercontent.com
185.199.108.153              assets-cdn.github.com
185.199.108.133              camo.githubusercontent.com
185.199.108.133              github.map.fastly.net
199.232.69.194               github.global.ssl.fastly.net
140.82.113.4                 gist.github.com
185.199.108.153              github.io
140.82.114.4                 github.com
140.82.112.6                 api.github.com
185.199.108.133              raw.githubusercontent.com
185.199.108.133              user-images.githubusercontent.com
185.199.108.133              favicons.githubusercontent.com
185.199.108.133              avatars5.githubusercontent.com
185.199.108.133              avatars4.githubusercontent.com
185.199.108.133              avatars3.githubusercontent.com
185.199.108.133              avatars2.githubusercontent.com
185.199.108.133              avatars1.githubusercontent.com
185.199.108.133              avatars0.githubusercontent.com
185.199.108.133              avatars.githubusercontent.com
140.82.114.10                codeload.github.com
52.217.129.57                github-cloud.s3.amazonaws.com
52.217.66.44                 github-com.s3.amazonaws.com
52.217.197.177               github-production-release-asset-2e65be.s3.amazonaws.com
52.217.86.108                github-production-user-asset-6210df.s3.amazonaws.com
52.217.12.148                github-production-repository-file-5c1aeb.s3.amazonaws.com
185.199.108.153              githubstatus.com
64.71.144.211                github.community
185.199.108.133              media.githubusercontent.com
185.199.108.133              raw.github.com

# Please Star : https://github.com/ineo6/hosts
# Mirror Repo : https://gitee.com/ineo6/hosts
# Update at: 2022-04-15 18:13:53

# GitHub Host End
```

### 手动配置hosts

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

### 通过 SwitchHosts! 自动更新

这里推荐使用 `SwitchHosts!` 配置`hosts`，操作很简单，支持跨平台。

详细介绍可以阅读 [SwitchHosts! 还能这样管理hosts，后悔没早点用](https://mp.weixin.qq.com/s/A37XnD3HdcGSWUflj6JujQ) 。

#### 手动配置

添加一条`hosts`规则并启用，然后复制前文`hosts`内容即可。

如果你想保持和云端最新规则同步，可以用下面的配置方式。

#### 定时同步

添加一条规则：

- 方案名：GitHub（可以自行命名）
- 类型：远程
- URL 地址：https://gitee.com/ineo6/hosts/raw/master/hosts
- 自动更新：1个小时

这样就可以和最新的`hosts`保持同步。

![switchhost-github.png](https://i.loli.net/2021/03/28/XnHW5xCEzel36fA.png)

## 我的作品

- [GitMaster](https://github.com/ineo6/git-master)：开发者助手，代码仓库结构浏览器扩展
- [Weekly 周刊](https://github.com/ineo6/weekly)：我的前端周刊，GitHub周刊
- [homebrew-install](https://github.com/ineo6/homebrew-install)：Homebrew快速安装教程和脚本
- [GitHub Hosts](https://github.com/ineo6/hosts)：GitHub最新hosts，定时更新
- [mp-ci](https://github.com/ineo6/mp-ci)：微信小程序、小游戏发布助手（CI）
