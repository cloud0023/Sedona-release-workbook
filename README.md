# 释放法练习本 PWA

这是一个手机优先的本地 PWA，用来把《释放法配套练习本》电子化。应用尽量按练习本主题、顺序、表格和释放逻辑组织，数据保存在用户设备浏览器本地。

## 当前功能

- 首页四个入口：主题释放数据库、开始释放、收获本、目标与行动。
- 主题释放数据库按练习本顺序组织主题。
- 情绪/感受类主题使用四问引导：
  - 允许自己感受它吗？
  - 可以放它离开吗？
  - 愿意放它走吗？
  - 什么时候放它离开呢？
- 想要类主题只使用前两问：
  - 允许自己感受这个想要吗？
  - 可以放它离开吗？
- `释放了吗=否` 会回到同一个情绪/想要重新引导。
- `释放了吗=是` 后继续问 `感觉好吗？`。
- 只有 `感觉好了` 才结束本次释放。
- 主题释放记录支持：
  - 左侧记录列表。
  - 右侧编辑具体内容、情绪/想要、释放勾选、感觉好了吗、收获。
  - 点击 `释放记录` 右侧 `＋` 会新增一条空记录，并直接在右侧编辑。
- 收获本会显示手动收获、引导释放后的收获、主题释放记录里的收获。

## 技术栈

- 无构建静态 PWA：`index.html`、`styles.css`、`src/app.js`。
- 本地数据：IndexedDB。
- 离线缓存：`service-worker.js`。
- 本地预览服务：`scripts/static-server.mjs`。
- Smoke test：`scripts/smoke-test.mjs`。

## 本地运行

### PC端
```powershell
cd C:\Users\sunyue\Desktop\Codex\释放法练习本
npm start
```

然后打开：

```text
http://127.0.0.1:4173/index.html?v=10
```

如果浏览器缓存旧版本，更新 `index.html` 里的资源版本号，以及 `service-worker.js` 里的 `CACHE_NAME`。

### 手机端

 cd C:\Users\sunyue\Desktop\Codex\释放法练习本
python -m http.server 4173 --bind 192.168.1.9

http://192.168.1.9:4173/index.html?v=10

## GitHub Pages 部署步骤

1. 在 GitHub 新建一个仓库，例如 `release-workbook-pwa`。
2. 本地添加 remote：

```powershell
git remote add origin https://github.com/<你的用户名>/release-workbook-pwa.git
```

3. 推送代码：

```powershell
git branch -M main
git push -u origin main
```

4. 仓库中已经包含显式 GitHub Pages workflow：

```text
.github/workflows/pages.yml
```

并包含：

```text
.nojekyll
```

这个项目是纯静态 PWA，不需要 Jekyll 构建。

5. 在 GitHub 仓库页面打开：

```text
Settings -> Pages
```

6. Source 必须选择：

```text
GitHub Actions
```

不要选择 `Deploy from a branch`。这个仓库之前用 branch/root 触发过 GitHub 自动 Jekyll Pages 流程，表现是 `Build with Jekyll` 成功，但 `Deploy to GitHub Pages` 失败。

7. 保存后，到 `Actions` 页面运行或等待自动运行：

```text
Deploy GitHub Pages
```

8. 成功后 GitHub 会给出类似下面的网址：

```text
https://<你的用户名>.github.io/release-workbook-pwa/
```

9. 手机上打开这个网址，然后在浏览器菜单里选择“添加到主屏幕”。

当前仓库的预期地址是：

```text
https://cloud0023.github.io/Sedona-release-workbook/
```

如果 workflow 卡在 `Deploy to GitHub Pages`，优先检查 `Settings -> Pages -> Source` 是否已经切换为 `GitHub Actions`。

## 后续更新发布

每次修改代码后：

```powershell
npm.cmd run test:smoke
git add .
git commit -m "说明这次改动"
git push
```

GitHub Actions 会自动部署 GitHub Pages。因为 PWA 有缓存，建议每次发布都同步：

- `index.html`：把 `styles.css?v=数字` 和 `src/app.js?v=数字` 的数字加一。
- `service-worker.js`：把 `CACHE_NAME` 里的版本号加一。

## 数据与备份

练习数据保存在手机浏览器本地 IndexedDB，不会上传到 GitHub。代码更新通常不会删除数据，但以下情况可能导致数据丢失：

- 清理浏览器网站数据。
- 换浏览器。
- 换手机。
- 卸载主屏幕 PWA 时同时清掉站点数据。

后续建议增加“导出 JSON / 导入 JSON”功能，作为手机数据备份和迁移方案。
