# 项目交接说明

## 项目目标

用户是释放法初学者，希望把 PDF 练习本变成本地手机软件，方便随时随地做释放练习。应用应尽量贴合练习本原有主题、顺序、表格和释放逻辑，而不是做成泛泛的情绪日记。

## 产品原则

- 手机优先，适合随时打开做一次释放。
- 优先本地保存，保护隐私。
- 尽量按照练习本来：
  - 第一周偏情绪/感受释放。
  - 第二周偏想要释放。
  - 主题页按练习本顺序组织。
- “释放了”只表示当前情绪/想要释放完成。
- “感觉好了”才表示本次释放结束。
- 收获很重要，释放结束和主题记录都应能写收获。

## 首页入口

首页有四个主要入口：

1. 主题释放数据库
2. 开始释放
3. 收获本
4. 目标与行动

## 主题释放数据库

主题数据库按原书顺序排列。每个主题包含：

- 练习本页码。
- 主题类型：情绪/感受或想要。
- 主题说明/提醒。
- 释放记录。

释放记录采用左右二级浏览：

- 左侧：释放目标/内容列表。每条前面显示 `感觉好了吗` 的勾选状态。
- 右侧：选中记录的详情编辑区。

右侧详情可编辑：

- 具体内容，即练习本表格第一个字段。
- 所属列，例如喜欢/不喜欢、成功/失败等。
- 多条情绪/感受或想要。
- 每条情绪/想要的 `释放了吗` 勾选状态。
- `感觉好了吗`。
- 收获。

点击 `释放记录` 标题右侧的 `＋`，应新增一条空记录，并直接在右侧编辑，不跳转到上方表单。

## 引导式释放逻辑

主题释放根据所选主题决定释放类型。

情绪/感受类使用四问：

1. 允许自己感受它吗？
2. 可以放它离开吗？
3. 愿意放它走吗？
4. 什么时候放它离开呢？

想要类只使用前两问：

1. 允许自己感受这个想要吗？
2. 可以放它离开吗？

四问/两问中的否定回答不分叉，继续下一个问题。

之后询问：

1. 释放了吗？
2. 如果否，回到同一个情绪/想要重新引导。
3. 如果是，问感觉好吗？
4. 如果感觉不好，询问当前是什么情绪/感受或想要，再继续循环。
5. 如果感觉好了，本次释放结束，并提示填写收获。

## 开始释放

开始释放页包含：

- 主题释放。
- 自由释放。
- 进行中释放。

进行中模块放在页面底部。

点击 `开始主题释放` 后，不弹窗，而是直接进入引导式页面，先问两个前置问题：

1. 练习本表格第一个字段，例如“列出想改变的人、事、物”。
2. `我对此有什么感受？` 或 `我对此有什么想要？`

完成这两个问题后创建对应主题释放记录，并进入正式释放引导。

## 收获本

收获本显示三类内容：

- 手动新增的收获。
- 引导式释放结束后填写的收获。
- 主题释放记录里的收获。

主题释放记录里的收获要显示主题名和释放内容。

## 数据模型概念

当前实现没有 TypeScript 类型，但逻辑上包含：

- `ReleaseSession`：一次引导释放会话。
- `ReleaseRound`：释放会话中的一轮问题和结果。
- `TopicRecord`：主题数据库中的一条释放记录。
- `TopicRecord.items`：该记录下多条情绪/感受或想要，每条有 `released`。
- `Goal`：目标。
- `ActionItem`：目标行动项。
- `Gain`：收获。

数据保存在 IndexedDB stores：

- `sessions`
- `rounds`
- `topicRecords`
- `goals`
- `actions`
- `gains`

## 重要实现文件

- `index.html`：入口文件，包含 CSS/JS 版本号。
- `styles.css`：全部样式。
- `src/app.js`：应用状态、路由、IndexedDB、页面渲染、交互逻辑。
- `manifest.json`：PWA 清单。
- `service-worker.js`：离线缓存。
- `scripts/static-server.mjs`：本地预览服务器。
- `scripts/smoke-test.mjs`：基础 smoke test。

## 缓存和版本

PWA 容易缓存旧代码。每次发布新版本时应同时更新：

- `index.html` 中 `styles.css?v=数字`。
- `index.html` 中 `src/app.js?v=数字`。
- `service-worker.js` 中 `CACHE_NAME`。

当前最新版本号是 `v=6`，缓存名是 `sedona-workbook-v6`。

## GitHub Pages 注意事项

GitHub Pages 只托管静态代码，不保存用户练习数据。手机练习数据保存在手机浏览器本地 IndexedDB。

部署后用户可在手机浏览器打开 GitHub Pages 地址，并添加到主屏幕。

当前仓库：

```text
https://github.com/cloud0023/Sedona-release-workbook
```

预期 Pages 地址：

```text
https://cloud0023.github.io/Sedona-release-workbook/
```

### Pages 部署坑点记录

这个项目是纯静态 PWA，不需要 Jekyll。仓库曾经使用 GitHub Pages 的 `Deploy from a branch` / `main` / `/root` 配置，触发了 GitHub 自动的 `pages build and deployment` workflow。公开 API 显示：

- `build` job 成功。
- `Build with Jekyll` 成功。
- `Upload artifact` 成功。
- 失败在 `deploy` job 的 `Deploy to GitHub Pages`。

因此问题不是源码构建失败，而是 Pages 部署源/权限/环境配置问题。

已加入修复：

- `.nojekyll`
- `.github/workflows/pages.yml`

后续部署应在 GitHub 网页设置：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

不要继续使用 `Deploy from a branch`。如果 workflow 卡在 `Deploy to GitHub Pages`，优先检查 Source 是否切换到了 `GitHub Actions`。切换后可在 Actions 页面重新运行 `Deploy GitHub Pages`，或推送一个新 commit 自动触发。

后续强烈建议增加：

- 导出数据为 JSON。
- 从 JSON 导入数据。
- 提示用户定期备份。
