# 物理圖譜 · Atlas of Physics

離線、零依賴的初中 / 高中雙語物理教學平台。中文與英文對照課文，每個知識點配一張可拖動、可調參數的互動圖；首頁提供**學習地圖**（章節前置依賴圖），並內置**全文搜索**（Ctrl/⌘ K）、**目錄抽屜**、即時練習與打印講義。

An offline, zero-dependency bilingual (zh/en) physics teaching platform for junior & senior secondary: a learning map of chapter prerequisites, side-by-side bilingual lessons, one interactive figure per concept, full-text search, a contents drawer and self-check practice.

**線上 · Live**: https://horaceleong.github.io/Atlas-of-Physics/

## 內容規模

| | |
|---|---|
| 章節 | 24（初中 11 + 高中 13） |
| 知識點 | 113（中英對照 + 公式框 + 易錯點） |
| 互動圖 | 32（Canvas 2D / 自寫 3D 透視引擎，可拖動旋轉、調參數、看讀數） |
| 術語 | 189（中 / 英 / 符號三欄） |
| 練習 | 72（點擊判分並顯示解析） |

## 運行

雙擊 `index.html` 即可（file:// 直開、斷網可用）；或起本地服務：

```
python -m http.server 8137
```

若瀏覽器緩存了舊版，請強制刷新（Ctrl+F5）；資源 URL 已帶版本號，正常情況下無需手動清緩存。

## 功能

- **學習地圖**：每學段一張 SVG 依賴圖，箭頭 = 建議先學；懸停高亮前置與後續章節；節點即鏈接，鍵盤可達。
- **3D 引擎**：三維模擬由本地打包的 **Three.js r147**（WebGL）渲染——半球光 + 平行光、ACES 色調映射、柔和陰影、網格地面、OrbitControls 拖動旋轉 / 滾輪縮放 / 右鍵平移；所有資源本地化，file:// 直開仍然完全離線。
- **字體**：本地打包 **Noto Serif TC / Noto Sans TC**（可變字重，按全站字符集子集化，共約 860 KB）——繁體粗細、字形在任何設備、離線與 Canvas 標註中完全一致，不依賴系統字體。
- **語言**：中 / 中英 / EN 三態（默認中英對照；EN 模式下英文升級為大標題排版）。
- **搜索**：Ctrl/⌘ K 或 `/` 呼出，可搜章節、知識點、術語，回車直達並滾動定位。
- **目錄抽屜**：全站章節 + 本篇小節錨點。
- **課標標註**：每章標註教材單元（初中按 2022 義務教育物理課標主題、高中按人教版必修/選擇性必修），**僅作教學對照，非官方解讀**。
- **主題**：紙色 / 夜間；**進度**：已讀章節標記、繼續上次閲讀。
- **無障礙**：跳轉正文鏈接、焦點管理、canvas aria-label、鍵盤翻章（Alt+←/→）、reduced-motion 適配。
- **性能**：離屏與後台標籤頁自動暫停模擬時鐘，DPR 上限 2。
- **打印**：自帶 print 樣式，可打成本章講義。

## 授權

見 [LICENSE](LICENSE)：上游 [nathanliow/atlas-of-physics](https://github.com/nathanliow/atlas-of-physics)（MIT, © 2026 Nathan Liow）提供內容結構參考；中文撰寫、初中部分、全部互動圖與平台代碼為本項目新增（MIT, © 2026 Horace Leong）。`_source/` 為上游只讀克隆。

本站為**互動補充資源，非官方教材**；教材單元與課標主題標註僅作教學對照。
