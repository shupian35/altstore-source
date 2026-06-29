# AltStore Source

自用 AltStore 软件源，自动监控 GitHub 仓库 Release 更新。

## 应用列表

| 应用 | Bundle ID | GitHub 仓库 |
|------|-----------|-------------|
| PiliPlus | `com.example.piliplus` | bggRGjQaUbCoE/PiliPlus |
| 日程清单 | `com.dailygig.dailyGigJournal` | shupian35/daily_gig_journal |
| 课记 | `com.example.keeji` | shupian35/keeji |

## 添加到 AltStore

在 AltStore 中添加以下 Source URL：

```
https://shupian35.github.io/altstore-source/apps.json
```

## 自动更新

GitHub Actions 每 12 小时自动检查各仓库 Release，如有新版本发布则更新 `apps.json`。

也可手动触发更新：Actions → Update AltStore Source → Run workflow
