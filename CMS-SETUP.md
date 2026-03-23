# 博客在线编辑器 — 部署指南

## 第 1 步：创建 GitHub OAuth App

1. 打开 https://github.com/settings/developers
2. 点 **New OAuth App**
3. 填写：
   - **Application name**: 博客编辑器
   - **Homepage URL**: `https://yumx3499.github.io/blog/`
   - **Authorization callback URL**: `https://blog-oauth.你的用户名.workers.dev/callback`
   > ⚠️ callback URL 等第 2 步部署完 Worker 后再填，或者先填占位
4. 点 **Register application**
5. 拿到 **Client ID**（一串字符）
6. 点 **Generate a new client secret**，拿到 **Client Secret**（只显示一次，先复制）

## 第 2 步：部署 Cloudflare Worker

1. 注册/登录 https://dash.cloudflare.com
2. 左侧菜单 → **Workers & Pages** → **Create**
3. 选 **Create Worker**
4. 把 `oauth-worker/index.js` 的代码粘贴进去
5. 点 **Deploy**
6. 拿到 Worker 地址，形如 `https://blog-oauth.你的用户名.workers.dev`

### 设置环境变量

在 Worker 的 **Settings → Variables** 里添加：

| 变量名 | 值 |
|--------|-----|
| `GITHUB_CLIENT_ID` | 第 1 步拿到的 Client ID |
| `GITHUB_CLIENT_SECRET` | 第 1 步拿到的 Client Secret |

## 第 3 步：更新 CMS 配置

把 `public/admin/config.yml` 里的 `backend` 改成：

```yaml
backend:
  name: github
  repo: yumx3499/blog
  branch: master
  base_url: https://你的worker地址  # 不含 /auth 或 /callback
```

然后提交推送到 GitHub。

## 完成！

访问 `https://yumx3499.github.io/blog/admin/`，点登录，就可以写文章了 ✅

## 文件清单

- `public/admin/index.html` — CMS 入口页面
- `public/admin/config.yml` — CMS 配置
- `oauth-worker/index.js` — OAuth 回调服务代码
- `oauth-worker/wrangler.toml` — Cloudflare Worker 配置
