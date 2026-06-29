# 自用 AltStore 软件源

[![Workflow](https://github.com/shupian35/altstore-source/actions/workflows/update.yml/badge.svg)](https://github.com/shupian35/altstore-source/actions/workflows/update.yml)

此项目为自用 AltStore 软件源，自动监控 GitHub 仓库 Release 更新。

可以用于 [AltStore](https://altstore.io/)、[SideStore](https://sidestore.io/)、[LiveContainer](https://github.com/LiveContainer/LiveContainer) 等支持 AltStore 源格式的应用。

## 添加到 AltStore

将以下源 URL 导入到支持 AltStore 源格式的应用中：

```
https://raw.githubusercontent.com/shupian35/altstore-source/main/apps.json
```

[在线预览](https://therealfoxster.github.io/altsource-viewer/view/app/?source=https://raw.githubusercontent.com/shupian35/altstore-source/main/apps.json&id=com.example.piliplus)

## 应用列表

| 应用 | Bundle ID | GitHub 仓库 | 主题色 |
|------|-----------|-------------|--------|
| PiliPlus | `com.example.piliplus` | [bggRGjQaUbCoE/PiliPlus](https://github.com/bggRGjQaUbCoE/PiliPlus) | ![#00A1D6](https://via.placeholder.com/10/00A1D6/00A1D6.png) `#00A1D6` |
| 日程清单 | `com.dailygig.dailyGigJournal` | [shupian35/daily_gig_journal](https://github.com/shupian35/daily_gig_journal) | ![#FF6B6B](https://via.placeholder.com/10/FF6B6B/FF6B6B.png) `#FF6B6B` |
| 课记 | `com.example.keeji` | [shupian35/keeji](https://github.com/shupian35/keeji) | ![#FF6B6B](https://via.placeholder.com/10/FF6B6B/FF6B6B.png) `#FF6B6B` |

## 自动更新

GitHub Actions 每 12 小时自动检查各仓库 Release，如有新版本发布则自动更新 `apps.json`。

也可手动触发更新：Actions → Update AltStore Source → Run workflow
