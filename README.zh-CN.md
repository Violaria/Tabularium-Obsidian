# Tabularium for Obsidian

[English](README.md) · 中文 · [Lingua Latīna](README.la.md)

一个 Obsidian 插件，把笔记库以端到端加密的方式同步到自托管的 [Tabularium](https://github.com/Violaria/Tabularium) 服务器。它 fork 自 [Self-hosted LiveSync](https://github.com/vrtmrz/obsidian-livesync) 1.0.40，并包含 [Custom File Explorer sorting](https://github.com/SebastianMC/obsidian-custom-sort) 3.2.0 的文件列表排序，因此可以同时取代这两个插件。启用本插件前，请在笔记库中停用 Self-hosted LiveSync 和其他任何同步插件。

## 使用条件与网络访问

你需要一个 Tabularium 服务器上的账户；没有账户，插件什么也不做。所有网络请求都发往你填写的服务器地址：登录、签发和续期本设备的凭据、同步、发送到 Kindle 和分享。插件不发送任何遥测数据，帮助页面随插件打包。

笔记在离开设备前，用笔记库的密码短语在设备上加密（LiveSync E2EE V2，带路径混淆）。密码短语只保存在设备上，服务器会拒绝未加密的文档。只有两个功能会发送可读内容，而且只在你使用时发送：发送到 Kindle 经服务器发出一个 EPUB；分享的笔记会发布在一个链接上，任何拿到链接的人都能打开。

## 功能

- 用服务器地址、用户名和密码登录，然后选择已有的笔记库或新建一个，给设备命名并输入密码短语。插件会为这台设备获取单独的凭据，并在使用中自动续期。
- 来自 LiveSync 的同步与冲突处理：
  - 实时、定时或由事件触发的同步，冲突处理，以及每篇笔记的历史版本。
  - 连接时始终开启加密和路径混淆。
  - 原插件的隐藏文件同步、自定义同步，以及手动配置 CouchDB、对象存储和 P2P 的方式都已删除。
- 设置页中的维护功能：从服务器取回全部内容、用本设备覆盖服务器（需笔记库所有者先在网页上允许）、解除锁定、诊断。
- 用 `sortspec.md` 文件排序文件列表，用法与 Custom File Explorer sorting 相同。
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

本仓库是 [Tabularium](https://github.com/Violaria/Tabularium) 的子模块，依赖父仓库中的排序包。用 `--recurse-submodules` 克隆父仓库，然后使用 Node.js 24.10.0：

```bash
npm run bootstrap
npm run build --prefix apps/obsidian      # main.js
npm run check --prefix apps/obsidian      # 类型检查、lint、Svelte 检查
npm run test:unit --prefix apps/obsidian
```

同一份源码还会生成 Tabularium 服务器使用的云笔记（`src/apps/notes/`）和 LiveSync CLI（`src/apps/cli/`）。

## 许可证

MIT，与 Self-hosted LiveSync 相同，其版权声明保留在 `LICENSE` 中。Custom File Explorer sorting 的作者是 SebastianMC。
