const fs = require('fs');
const path = require('path');

const APPS_CONFIG = [
  {
    name: 'PiliPlus',
    bundleIdentifier: 'com.example.piliplus',
    repo: 'bggRGjQaUbCoE/PiliPlus',
    tintColor: '00A1D6',
    iconURL: 'https://raw.githubusercontent.com/bggRGjQaUbCoE/PiliPlus/0df637fb733fcb248231b1dc2637e076e1a8f19b/assets/images/logo/logo.png',
    description: '使用Flutter开发的BiliBili第三方客户端'
  },
  {
    name: '日程清单',
    bundleIdentifier: 'com.dailygig.dailyGigJournal',
    repo: 'shupian35/daily_gig_journal',
    tintColor: 'FF6B6B',
    iconURL: 'https://raw.githubusercontent.com/shupian35/daily_gig_journal/ef310d4c70e5e992efa124a2acf163056d6c0b5b/assets/icon/app_icon.png',
    description: '帮助日结兼职人员轻松记录工作安排、笔记与工资统计'
  },
  {
    name: '课记',
    bundleIdentifier: 'com.example.keeji',
    repo: 'shupian35/keeji',
    tintColor: 'FF6B6B',
    iconURL: 'https://raw.githubusercontent.com/shupian35/keeji/b2c278b1dd5a05003959ab92b5d0e0e7ea90c6d9/assets/icon/app_icon.png',
    description: '用于将视频课程转换为结构化笔记'
  }
];

async function fetchLatestRelease(repo) {
  const url = `https://api.github.com/repos/${repo}/releases/latest`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
    }
  });

  if (!response.ok) {
    console.error(`Failed to fetch release for ${repo}: ${response.status}`);
    return null;
  }

  return response.json();
}

function findIpaAsset(release) {
  if (!release?.assets) return null;
  return release.assets.find(asset => asset.name.endsWith('.ipa'));
}

async function updateAppsJson() {
  const appsJsonPath = path.join(__dirname, '..', 'apps.json');
  const appsData = JSON.parse(fs.readFileSync(appsJsonPath, 'utf8'));

  for (const config of APPS_CONFIG) {
    const app = appsData.apps.find(a => a.name === config.name);
    if (!app) {
      console.log(`App ${config.name} not found in apps.json, skipping`);
      continue;
    }

    console.log(`Checking ${config.repo}...`);
    const release = await fetchLatestRelease(config.repo);

    if (!release) {
      console.log(`No release found for ${config.repo}`);
      continue;
    }

    const ipaAsset = findIpaAsset(release);
    if (!ipaAsset) {
      console.log(`No .ipa file found in release for ${config.repo}`);
      continue;
    }

    const newVersion = release.tag_name.replace(/^v/, '');
    const currentVersion = app.version;

    console.log(`Current version: ${currentVersion}, Latest version: ${newVersion}`);

    if (newVersion !== currentVersion || !app.downloadURL) {
      app.version = newVersion;
      app.versionDate = release.published_at || new Date().toISOString();
      app.versionDescription = (release.body || '').replace(/\*\*.*?\*\*/g, '').replace(/[\r\n]+/g, ' ').trim().substring(0, 500);
      app.downloadURL = ipaAsset.browser_download_url;
      console.log(`Updated ${config.name} to version ${newVersion}`);
    } else {
      console.log(`${config.name} is already up to date`);
    }
  }

  fs.writeFileSync(appsJsonPath, JSON.stringify(appsData, null, 2) + '\n');
  console.log('apps.json updated successfully');
}

updateAppsJson().catch(console.error);
