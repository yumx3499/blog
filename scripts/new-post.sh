#!/bin/bash
# 博客新文章创建脚本
# 用法: bash scripts/new-post.sh "文章标题"

set -e

TITLE="${1:-新文章}"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
FILENAME="src/data/blog/${SLUG}.md"

if [ -f "$FILENAME" ]; then
    echo "❌ 文件已存在: $FILENAME"
    echo "换个标题或手动编辑: $FILENAME"
    exit 1
fi

cat > "$FILENAME" << EOF
---
title: ${TITLE}
description: 在这里写一句话描述
pubDatetime: ${DATE}
author: yumx
draft: false
tags:
  - 默认
---

## Table of contents

## 开始

在这里写你的内容...
EOF

echo "✅ 创建成功: $FILENAME"
echo ""
echo "接下来："
echo "  1. 编辑文件: vim $FILENAME"
echo "  2. 本地预览: cd /tmp/blog && npx astro dev"
echo "  3. 发布: git add . && git commit -m '发布: $TITLE' && git push"
