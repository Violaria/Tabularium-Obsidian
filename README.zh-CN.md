# Tabularium for Obsidian

[English](README.md) · 中文 · [Lingua Latīna](README.la.md)

一个 Obsidian 插件，把笔记库以端到端加密的方式同步到自托管的 [Tabularium](https://github.com/Violaria/Tabularium) 服务器。

## 使用条件与网络访问

插件需要 Obsidian 1.13 或更新版本，以及 Tabularium 服务器上的账户。所有网络请求都发往你填写的服务器地址：登录、签发和续期本设备的凭据、同步、发送到 Kindle 和分享。帮助页面随插件打包。

笔记在离开设备前，用笔记库的密码短语在设备上加密（E2EE V2，带路径混淆）。密码短语只保存在设备上，服务器会拒绝未加密的文档。只有两个功能会发送可读内容，而且只在你使用时发送：发送到 Kindle 经服务器发出一个 EPUB；分享的笔记会发布在一个链接上，任何拿到链接的人都能打开。

## 功能

- 用服务器地址、用户名和密码登录，然后选择已有的笔记库或新建一个，给设备命名并输入密码短语。插件会为这台设备获取单独的凭据，并在使用中自动续期。
- 同步与冲突处理：
  - 实时、定时或由事件触发的同步，冲突处理，以及每篇笔记的历史版本。
  - 连接时始终开启加密和路径混淆。
  - 只经 Tabularium 服务器同步：不同步隐藏文件和插件、主题设置，也不能手动配置 CouchDB、对象存储或 P2P。
- 设置页中的维护功能：从服务器取回全部内容、用本设备覆盖服务器（需笔记库所有者先在网页上允许）、解除锁定、诊断。
- 在 `Collation.md` 笔记中用缩进列表自定义文件列表的排序。
- 把一篇笔记、一个文件夹或一段选中内容发送到服务器上配置的 Kindle 地址。
- 把笔记或文件夹分享为网页；分享的文件改动后，网页随之更新。
- 选中文字时出现格式工具条；还有查找并修复失效内部链接的工具。
- 界面支持英文、中文和拉丁语。

## 安装

在插件进入 Obsidian 社区插件目录之前，安装步骤是：
1. 从发布包中把 `main.js`、`manifest.json` 和 `styles.css` 复制到笔记库的 `.obsidian/plugins/tabularium/`；
2. 在「第三方插件」中启用 Tabularium；
3. 运行命令「Tabularium: 服务器连接」登录。

## 构建

使用 Node.js 24.10.0：

```bash
npm ci
npm run build       # main.js
npm run check       # 类型检查、lint、Svelte 检查
npm run test:unit
```

Release 中的文件由 GitHub Actions 从带标签的提交构建，与测试过的构建逐字节核对，并附有构建来源证明（`gh attestation verify main.js --repo Violaria/Tabularium-Obsidian`）。

本仓库是 [Tabularium](https://github.com/Violaria/Tabularium) 的子模块。`packages/sync-core/` 中的同步核心也供服务器的云笔记和命令行客户端使用，它们在 [Tabularium-Server](https://github.com/Violaria/Tabularium-Server) 中。

