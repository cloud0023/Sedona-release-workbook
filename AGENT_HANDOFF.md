# AI Agent 项目交接说明

本文件写给下一台电脑上的 AI agent。新环境如果没有对话历史，请先阅读本文件，再阅读 `PROJECT_CONTEXT.md`、`.impeccable.md`、`HANDOFF_THEME_RECORD_REDESIGN.md`，最后再进入代码。

## 1. 项目背景

项目名：释放法练习本。

这是一个本地优先的释放法练习 PWA，用来帮助用户按练习本主题记录释放过程、释放情绪/想要、回写收获，并在手机上进行低干扰的练习。目标用户不仅是当前作者，也包括其他释放法初学者。

产品气质要求：

- 手机优先，同时兼顾桌面。
- 安静、专注、有仪式感、极简，接近冥想 App 或纸质练习本。
- 避免商业化 dashboard 感、过度装饰、太花、太挤。
- 输入流程要顺畅，不要让用户在释放过程中被复杂表格和嵌套表单打断。

## 2. 当前分支与状态

当前主要开发分支：

```text
main
```

用户已经确认采用原 `explore/card-record-flow` 探索分支的效果。当前 `main` 已经指向这套“卡片列表 + 层层递进详情页”的主题释放数据库 UI，旧主分支内容不再作为正式方向维护。

历史分支状态：

- `explore/card-record-flow`：仍保留，并已同步到与 `main` 相同的最新提交，可作为探索历史参考。
- `archive/main-before-card-record-flow`：本地备份分支，指向采用卡片递进 UI 之前的旧 `main`。该备份分支尚未推送到远程。
- 桌面主目录 `C:\Users\sunyue\Desktop\Codex\释放法练习本` 现在是正式 `main` 工作目录。
- Codex worktree 目录 `C:\Users\sunyue\.codex\worktrees\27a2\释放法练习本` 仍绑定 `explore/card-record-flow`，只是历史/并行工作区，不再是主要开发入口。

本地还有一个保护性 stash：

```text
stash@{0}: On main: pre-card-flow-main-local-pdf-rename
```

它保存的是切换 `main` 前桌面目录里未提交的 PDF 文件名变动。不要随手丢弃；如果要处理 PDF 文件名，先查看这个 stash 的内容。

远程仓库：

```text
https://github.com/cloud0023/Sedona-release-workbook.git
```

当前 GitHub Pages 相关注意：

- `.github/workflows/pages.yml` 已改回只从 `main` 发布。
- 之前探索期曾让 workflow 从 `explore/card-record-flow` 发布，并移除过 `environment` 配置以绕开 Pages 分支限制；现在正式方向已回到 `main`。
- GitHub Pages 项目站点通常只有一个线上 URL，所以后续发布应以 `main` 为准。
- 已知 Pages URL：

```text
https://cloud0023.github.io/Sedona-release-workbook/
```

当前本地 `main` 尚有未推送提交，包含：

```text
6131292 feat: add emotion reference to topic records
本轮主题系列与重复释放改造
```

这些改动尚未推送。推送后需要验证 GitHub Pages 部署是否成功，以及线上是否已经加载 `v=36` 资源。

## 3. 运行与检查命令

本项目是静态 HTML/CSS/JS，不需要构建步骤。

本地启动：

```powershell
npm start
```

默认端口是 `4173`。如果端口被占用，可临时用其他端口：

```powershell
python -m http.server 4174
```

常用检查：

```powershell
node --check src\app.js
npm.cmd run test:smoke
git diff --check
```

Windows 中文环境注意编码。读取文件时优先显式 UTF-8，例如：

```powershell
Get-Content -Encoding utf8 src\app.js
```

Python 命令优先：

```powershell
python -X utf8 script.py
```

## 4. 代码结构

核心文件：

- `index.html`
  - App 入口。
  - 当前资源版本号为 `?v=36`。
  - 修改 `src/app.js` 或 `styles.css` 后，如果涉及浏览器缓存，需要同步递增这里的版本号。

- `src/app.js`
  - 几乎所有业务逻辑、数据结构、视图渲染、事件处理都在这里。
  - 包含主题定义、IndexedDB 操作、释放引导流程、主题记录数据库 UI、PDF 资料页。

- `styles.css`
  - 全局视觉样式。
  - 当前探索分支的递进式卡片 UI、底部导航图标、PDF 资料页样式都在这里。

- `service-worker.js`
  - PWA 离线缓存。
  - 当前 `CACHE_NAME` 是 `sedona-workbook-v36`。
  - 修改缓存资源或版本后，要与 `index.html` 资源版本同步递增。

- `manifest.json`
  - PWA manifest。

- `scripts/smoke-test.mjs`
  - 烟测脚本。

- `92年资料-释放法配套练习本7649484604780677392.pdf`
  - 内嵌释放资料 PDF。

- `情绪表格.jpg`
  - 情绪参考图资源。

- `.github/workflows/pages.yml`
  - GitHub Pages 部署 workflow。

- `.impeccable.md`
  - 当前设计方向和产品气质的关键说明。

- `HANDOFF_THEME_RECORD_REDESIGN.md`
  - 主题释放记录结构化重构的历史交接文件。

## 5. 数据模型

IndexedDB 数据库名是 `sedona-workbook`。主要 store 包括：

- `sessions`
- `rounds`
- `topicRecords`
- `topicSeries`
- `goals`
- `actions`
- `gains`

主题释放记录已经从旧的 `items` 扁平模型改为 v2 结构化模型。旧记录可以留在本地，但新代码不支持旧记录查看、编辑或导出。

`TopicRecord` 统一结构：

```js
{
  id,
  seriesId,
  topicId,
  schemaVersion: 2,
  structureType,
  subject,
  sections,
  gain,
  createdAt,
  updatedAt
}
```

`TopicSeries` 用来归拢同一主题的多次独立释放：

```js
{
  id,
  topicId,
  subject,
  createdAt,
  updatedAt
}
```

普通新建始终创建独立系列；只有系列详情中的“再次释放”会沿用 `seriesId`。旧结构化记录会逐条迁移到独立系列，不按相同标题合并。

`ReleaseSection`：

```js
{
  id,
  key,
  title,
  text,
  feelsGood,
  groups,
  cards,
  createdAt,
  updatedAt
}
```

`ReleaseGroup`：

```js
{
  id,
  text,
  feelsGood,
  cards,
  createdAt,
  updatedAt
}
```

`ReleaseCard`：

```js
{
  id,
  kind: "feeling" | "want",
  text,
  released,
  createdAt,
  updatedAt
}
```

释放引导 session 会通过 `structurePath` 定位当前写回位置：

```js
{
  recordId,
  structurePath: {
    sectionId,
    groupId,
    cardId
  }
}
```

重要原则：

- 不再围绕旧 `record.items` 补丁式兼容。
- 新增、编辑、导出、释放回写都应读写 `record.sections`。
- 数据字段名 `feelsGood` 不改，用户可见文案可写成“感觉好吗？”。

## 6. 当前探索 UI

探索分支把主题释放数据库从“嵌套式表单”改成了三层递进：

1. 释放记录列表页
   - 显示主题标题、简短说明、释放记录列表。
   - `+ 新建记录` 只创建内存草稿，不立即写入 IndexedDB。
   - 记录卡片只展示摘要，点击进入记录详情。
   - 记录卡片右侧有箭头，可展开低频删除按钮。

2. 记录详情页
   - 编辑主题文本或显示默认主题。
   - 用 segmented 切换当前分区。
   - 所有有分区选择的切换说明统一为“释放的角度”。
   - 当前分区下显示方面/行动/事情/条目卡片列表。
   - 点击添加条目会进入对应详情页。
   - 底部保留“收获”输入。
   - 显式点击“保存记录”后才写入 IndexedDB。

3. 方面/事情/条目详情页
   - 编辑具体内容。
   - 感受/想要列表在本页内直接新增、编辑、标记释放。
   - 点击“添加感受”或“添加想要”会在列表末尾新增行并自动聚焦。
   - 状态 chip 点击切换“未释放 / 已释放”。
   - 删除作为低频操作，通过右箭头展开。
   - “感觉好吗？”使用二段按钮写入当前 group 或 section 的 `feelsGood`。
   - 保存后返回记录详情。

4. 主题记录内的情绪参考
   - 只在 `topic.type === "emotion"` 的感受列表中显示；想要类主题不显示。
   - 标题右侧有默认关闭的“情绪参考”入口；每条感受左侧圆形图标也是绑定当前行的快捷入口。
   - 展开后复用九大主情绪与子情绪面板。点击主情绪会写入该主情绪；点击子情绪也写入其所属主情绪，子情绪只用于帮助辨认。
   - 同一时间只展开一条感受的参考区。多条感受时必须用 `cardId` 定位写入目标，不能查询第一条输入框。
   - 展开状态只存在于 UI state：`activeDraftCardId`、`emotionReferenceCardId`，不新增 IndexedDB 字段；手动输入仍正常工作。
   - 主情绪选择会直接更新 draft card，而不是只改 DOM 输入框，以保证保存、重绘和重新编辑后不丢失。
   - 窄屏为横向滑动情绪带，若已有选中主情绪，展开时自动滚动到该项；子情绪面板支持 Esc 关闭与可见焦点样式。

视觉方向参考用户给过的三张高保真图：

- 浅纸色背景。
- 深绿色主按钮。
- 低饱和金色点缀。
- 柔和圆形图标底座。
- 克制卡片阴影和留白。
- 底部导航使用内联 SVG 图标 + 文案，不再用单字占位图标。

## 7. 主题结构

常规复杂主题：

- `success`
  - 分区：`如果成功`、`如果失败`
  - 分区直接包含感受 cards 和 `feelsGood`。

- `likes-dislikes`
  - 分区：`喜欢的方面`、`不喜欢的方面`
  - 每个分区包含 groups，group 是具体方面。
  - group 内包含感受 cards 和 `feelsGood`。

- `stuckness`
  - 分区：`有什么好处`、`有什么坏处`
  - 每个分区包含 groups，group 是好处/坏处条目。

- `goal`
  - 合并旧 `goal-feelings` 和 `goal-actions`。
  - 分区：`目标感受`、`行动清单`。
  - 目标感受直接在 section.cards 内编辑。
  - 行动清单使用 groups，每个行动内有行动感受 cards 和 `feelsGood`。

简单主题：

- 使用同一 v2 模型。
- 默认一个 section。
- 有归属列的简单主题可使用多个 section。
- 感受/想要在 section.cards。
- `gain` 仍在整条 record 上。

## 8. 特殊条目化主题

用户明确要求只有以下主题改成“选择分区后，先填写具体释放内容，再释放具体情绪”的层级，其他主题不用。

这些主题不需要用户手动填写 subject，使用默认 subject。释放记录卡片重名时可在摘要里加分区/条目标注。

当前默认 subject 映射：

- `suppress-express`：`压抑或表达`
- `remember-approval-control`：`想要被认同和控制`
- `letting-go-wants`：`想要和不想要的东西`
- `want-control`：`从想要控制能得到什么`
- `want-approval`：`从想要认同能得到什么`
- `seeing-wants`：`获得三大想要的方式`
- `happiness`：`快乐需要什么`

当前交互语方向：

- `suppress-express`
  - 分区：`压抑情绪`、`表达情绪`
  - 详情输入引导：`回忆一件压抑情绪的事` / `回忆一件表达情绪的事`
  - 条目单位：事情

- `remember-approval-control`
  - 分区：`想要认同`、`想要控制`
  - 详情输入引导：`回想一件想要被认同的事` / `回想一件想要控制的事`

- `letting-go-wants`
  - 分区：`想要的东西`、`不想要的东西`
  - 详情输入引导：`我想要什么东西` / `我不想要什么东西`

- `want-control`
  - 分区：`想要控制`、`想要被控制`
  - 详情输入引导：`从想要控制中能得到什么` / `从想要被控制中能得到什么`

- `want-approval`
  - 分区：`想要认同`、`不被认同`
  - 详情输入引导：`从想要认同中能得到什么` / `从不被认同中能得到什么`

- `seeing-wants`
  - 分区：`寻求认同`、`寻求安全`、`试图控制`
  - 详情输入引导：`我寻求被认同的方式` / `我寻求安全的方式` / `我试图控制的方式`

- `happiness`
  - 分区：`需要什么`、`避免什么`
  - 详情输入引导：`我需要什么才能获得快乐` / `我避免什么才能获得快乐`

## 9. 释放引导流程

“开始释放”流程已经与结构化记录打通：

- setup 阶段根据主题 schema 收集必要上下文。
- 创建或定位 record 后，创建 card，并把 `structurePath` 写入 session。
- “释放了吗”回写当前 card.released。
- “感觉好吗”回写当前 section 或 group 的 `feelsGood`。
- 如果“感觉好吗 = 否”，在同一个 section/group 下追加新 card。
- “还想继续释放吗 = 想”时按主题规则进入下一轮上下文选择。
- 收获写入整条 `record.gain`。

目标主题的特殊释放逻辑：

- 目标释放引导时，不让用户选择属于目标感受还是行动清单。
- 用户填写目标后，直接问“对此有什么感受”。
- 如果目标感受“感觉好了”，默认进入行动清单，让用户填写“为了达成目标要做的事”。
- 只有行动清单的感觉好了以后，才问“还想继续释放吗”。
- 如果想继续，就继续填写下一件行动，循环释放行动感受。

释放过程顶部上下文：

- 保留主题、分区、具体内容等小字提示。
- 不显示“当前感受”，因为当前情绪在下方引导卡片里已经显示。

## 10. PDF 释放资料页

首页已经移除“目标与行动”模块，新增“释放资料”模块。

资料页功能：

- 内嵌 PDF：

```js
const MATERIALS_PDF_FILE = "92年资料-释放法配套练习本7649484604780677392.pdf";
```

- 使用 iframe 作为 PDF 阅读器。
- 目录由主题数据生成，加上封面入口。
- 用户要求目录保持简洁，目前目录 outline 只显示标题，不显示页码和说明。

注意：

- 移动端内嵌 PDF 支持因浏览器而异，需要真机验证。
- PDF 文件名包含中文和长数字，修改文件名时必须同步 `MATERIALS_PDF_FILE`、service worker 缓存列表和相关链接。

## 11. 最近完成的工作

最近这一轮主要完成：

- 新建 `explore/card-record-flow` 探索分支。
- 用户确认探索分支效果优于旧主分支，已将 `main` 更新为探索分支内容。
- 旧 `main` 已在本地备份为 `archive/main-before-card-record-flow`。
- Pages workflow 已改回只从 `main` 发布。
- 实现递进式卡片 UI。
- 记录卡片和方面卡片加入展开式删除。
- 记录摘要补齐多分区显示，不只展示当前分区。
- 特定主题改成条目化记录层级。
- 扩展分区按钮文字到 4 到 6 个字左右，如“喜欢的方面”“如果成功”“行动清单”“需要什么”。
- 将分区切换说明统一为“释放的角度”。
- 将详情感受标题统一为“我对此有什么感受？”。
- 将具体内容输入附近的 label 改为更明确的引导语。
- 在 group 详情上下文中显示手动输入的主题内容，例如“喜欢与不喜欢 · 看房子 · 喜欢的方面”。
- 调整字体、字号、排版、按钮层级和 responsive grid。
- 首页增加释放资料 PDF 页面。
- 释放资料目录从卡片改为简洁 outline。
- 将 `main` 和 `explore/card-record-flow` 推送到 GitHub。
- 新增主题记录内默认折叠的情绪参考，复用既有九大情绪和子情绪面板。
- 情绪参考支持标题入口和感受行内快捷入口；子情绪会归类写入所属主情绪。
- 验证了主情绪写入、子情绪归类、多条感受不串写，以及 320px / 572px 宽度下的展开布局。
- 更新前端与 PWA 缓存版本至 `v=35`。
- 创建本地提交 `6131292 feat: add emotion reference to topic records`，尚未推送。
- 新增 `topicSeries` store，数据库版本升级到 2，并以确定性系列 ID 幂等迁移旧结构化记录。
- 主题释放数据库改为“主题系列列表 → 系列详情 → 单次释放记录 → 分组详情”层级。
- 系列详情支持“再次释放”与“继续本次释放”，多次释放的数据、收获和状态彼此独立。
- 单次摘要统一为 `2/3 已释放 · 还没感觉好` 形式，并支持分区与 group 单位。
- 系列列表按最新一次记录的 `createdAt` 排序，删除与导出已适配系列层级。
- 更新前端与 PWA 缓存版本至 `v=36`；已验证 320px、375px、572px 卡片无横向溢出。

最近提交可用以下命令查看：

```powershell
git log --oneline -12
```

## 12. 已知风险与待确认

1. GitHub Pages 部署状态需要确认。
   - Pages workflow 已改回只监听 `main`。
   - 本地 `main` 仍有未推送提交；推送后检查 GitHub Actions 是否成功，以及线上是否已经是 `v=36`。

2. PDF 资料页需要移动端真机验证。
   - 某些手机浏览器对 iframe 内嵌 PDF 支持不好。
   - 如果体验不好，考虑提供“打开 PDF”按钮作为主路径，iframe 作为桌面增强。

3. 旧主分支备份只在本地。
   - 本地备份分支：`archive/main-before-card-record-flow`。
   - 该分支尚未推送远程；如果用户明确要求远程备份，再推送。
   - 不要删除这个本地备份分支，除非用户明确确认。

4. 主题释放数据库新 UI 已成为正式方向。
   - 用户对视觉质量要求较高。
   - 不要退回桌面表格感或深层嵌套表单。

5. 旧 IndexedDB 记录可能存在。
   - 旧 v1 或无 `schemaVersion` 的记录不进入新编辑/导出流程。
   - 页面不能因旧数据存在而崩溃。

6. 工作区有未跟踪目录 `reference/`。
   - 它不属于提交 `6131292`，本轮未修改或提交。
   - 后续提交前先确认它的来源与用途，不要因为使用 `git add .` 而误提交。

## 13. 后续 agent 工作建议

开始任何新修改前：

1. 确认分支：

```powershell
git status --short --branch
```

2. 阅读设计上下文：

```powershell
Get-Content -Encoding utf8 .impeccable.md
Get-Content -Encoding utf8 PROJECT_CONTEXT.md
Get-Content -Encoding utf8 HANDOFF_THEME_RECORD_REDESIGN.md
```

3. 修改前先定位相关函数：

```powershell
rg -n "TOPICS|TOPIC_STRUCTURES|ITEMIZED_TOPIC_STRUCTURES|topicRecordView|topicRecordEditPage|topicGroupEditPage|emotionPicker|emotionReferenceCardId|applyEmotionSelection|syncLinkedRecord" src\app.js
```

4. 修改后运行：

```powershell
node --check src\app.js
npm.cmd run test:smoke
git diff --check
```

5. 涉及前端资源时同步递增：

- `index.html` 中 `styles.css?v=...`
- `index.html` 中 `src/app.js?v=...`
- `service-worker.js` 中 `CACHE_NAME`

6. 提交与推送：

```powershell
git status --short
git add -- <明确要提交的文件>
git commit -m "..."
git push origin main
```

## 14. 面向新 agent 的实现原则

- 优先维护结构化数据模型，不要为了兼容旧 `items` 写补丁。
- 手机端优先，避免左右分栏、表格、过小点击区域。
- 复杂表单优先拆成递进详情页，不要在一屏内堆多层嵌套。
- 删除、导出等低频操作可以隐藏或次要化；保存、添加、释放状态是高频操作，应清晰突出。
- 文案要像练习引导，不像后台字段名。
- 视觉上保持纸感、留白、深绿主动作、金色少量点缀。
- 如果用户给出截图标注，以截图标注为准。
- 不要擅自回滚用户已有改动。
- 现在 `main` 已经是卡片递进 UI 正式方向；不要擅自恢复旧主分支内容。
- 不要删除 `archive/main-before-card-record-flow` 或 `stash@{0}`，除非用户明确确认。
