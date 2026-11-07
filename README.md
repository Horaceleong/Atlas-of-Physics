# 物理图谱 · Atlas of Physics

离线、零依赖的初中 / 高中双语物理教学平台。中文与英文对照课文，每个知识点配一张可拖动、可调参数的互动图；首页提供**学习地图**（章节前置依赖图），并内置**全文搜索**（Ctrl/⌘ K）、**目录抽屉**、即时练习与打印讲义。

An offline, zero-dependency bilingual (zh/en) physics teaching platform for junior & senior secondary: a learning map of chapter prerequisites, side-by-side bilingual lessons, one interactive figure per concept, full-text search, a contents drawer and self-check practice.

**线上 · Live**: https://horaceleong.github.io/Atlas-of-Physics/

## 内容规模

| | |
|---|---|
| 章节 | 24（初中 11 + 高中 13） |
| 知识点 | 113（中英对照 + 公式框 + 易错点） |
| 互动图 | 32（Canvas 2D / 自写 3D 透视引擎，可拖动旋转、调参数、看读数） |
| 术语 | 189（中 / 英 / 符号三栏） |
| 练习 | 72（点击判分并显示解析） |

## 运行

双击 `index.html` 即可（file:// 直开、断网可用）；或起本地服务：

```
python -m http.server 8137
```

## 功能

- **学习地图**：每学段一张 SVG 依赖图，箭头 = 建议先学；悬停高亮前置与后续章节；节点即链接，键盘可达。
- **语言**：中 / 中英 / EN 三态（默认中英对照；EN 模式下英文升级为大标题排版）。
- **搜索**：Ctrl/⌘ K 或 `/` 呼出，可搜章节、知识点、术语，回车直达并滚动定位。
- **目录抽屉**：全站章节 + 本篇小节锚点。
- **课标标注**：每章标注教材单元（初中按 2022 义务教育物理课标主题、高中按人教版必修/选择性必修），**仅作教学对照，非官方解读**。
- **主题**：纸色 / 夜间；**进度**：已读章节标记、继续上次阅读。
- **无障碍**：跳转正文链接、焦点管理、canvas aria-label、键盘翻章（Alt+←/→）、reduced-motion 适配。
- **性能**：离屏与后台标签页自动暂停模拟时钟，DPR 上限 2。
- **打印**：自带 print 样式，可打成本章讲义。

## 授权

见 [LICENSE](LICENSE)：上游 [nathanliow/atlas-of-physics](https://github.com/nathanliow/atlas-of-physics)（MIT, © 2026 Nathan Liow）提供内容结构参考；中文撰写、初中部分、全部互动图与平台代码为本项目新增（MIT, © 2026 Horace Leong）。`_source/` 为上游只读克隆。

本站为**互动补充资源，非官方教材**；教材单元与课标主题标注仅作教学对照。
