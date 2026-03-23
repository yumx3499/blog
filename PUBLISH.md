# 博客发布指南 📝

## 发布流程

```
写 Markdown → 放到 src/data/blog/ → git push → GitHub Actions 自动部署
```

## 1. 创建新文章

用这个命令快速创建：

```bash
cd /tmp/blog
bash scripts/new-post.sh "你的文章标题"
```

会在 `src/data/blog/` 下生成一个带好模板的 `.md` 文件。

## 2. 文章格式

```yaml
---
title: 文章标题
description: 一句话描述（SEO 重要）
pubDatetime: 2026-03-23T08:00:00Z
author: yumx
draft: false
tags:
  - 标签1
  - 标签2
---

## 正文开始

这里是内容...

## 小标题

更多内容...
```

**必填字段：** `title`、`description`、`pubDatetime`

## 3. 发布

```bash
cd /tmp/blog
git add .
git commit -m "发布: 文章标题"
git push
```

GitHub Actions 会自动部署，约 1-2 分钟生效。

## 4. 草稿模式

设置 `draft: true` 可以写草稿，发布后不会显示在网站上。

## 5. 图片

- **推荐：** 放到 `src/assets/images/`，用 `![](@/assets/images/xxx.jpg)`
- **简单：** 放到 `public/assets/images/`，用 `![](/assets/images/xxx.jpg)`

## 6. 目录（Table of Contents）

在文章中加 `## Table of contents` 自动生成目录。

## 文件位置

- 文章目录：`/tmp/blog/src/data/blog/`
- 新建脚本：`/tmp/blog/scripts/new-post.sh`
- 本指南：`/tmp/blog/PUBLISH.md`
