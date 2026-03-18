/**
 * 站点配置 — 码上就懂
 *
 * 博客名称、描述、配色等全局配置
 * 配色方案严格按照 design-research.md 规范
 */

export const SITE = {
  website: "https://blog.example.com/", // 部署后替换为真实域名
  author: "码上就懂",                     // 站点作者名
  profile: "/about",                     // 个人主页链接
  desc: "写给下一个凌晨三点还在 Google 的你", // 站点描述 / Slogan
  title: "码上就懂",                      // 站点标题
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,                // 启用暗色模式切换
  postPerIndex: 4,
  postPerPage: 6,                        // 每页显示 6 篇文章
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,                    // 显示归档页
  showBackButton: true,
  editPost: {
    enabled: false,                      // 关闭编辑按钮（个人博客不需要）
    text: "",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "zh-CN",                         // HTML lang 设为中文
  timezone: "Asia/Shanghai",             // 时区：上海
} as const;
