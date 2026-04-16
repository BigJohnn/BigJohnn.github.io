# Astro 重建迁移蓝图

## 目标

将当前以 Jekyll/Hux Blog 为核心的个人博客，迁移为基于 Astro 的内容模型驱动静态站点，同时保留既有文章资产、主要 URL 习惯和 GitHub Pages 部署方式。

## 迁移原则

1. 旧 Jekyll 代码先保留，不做破坏性删除。
2. 新站直接在同一 repo 内建立 Astro 结构，先达到可并行开发、可逐步迁移。
3. 文章类内容优先保留旧 markdown，避免一开始重写全文。
4. 资源路径优先兼容旧引用，先复制到 `public/`，后续再做压缩与重命名。
5. 先把信息架构和 SEO 拉到现代水平，再做视觉和交互增强。

## 目标目录

```text
/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ public/
│  ├─ CNAME
│  ├─ robots.txt
│  ├─ img/
│  └─ videos/
├─ src/
│  ├─ components/
│  ├─ content/
│  │  ├─ blog/
│  │  ├─ pages/
│  │  ├─ projects/
│  │  └─ config.ts
│  ├─ data/
│  ├─ layouts/
│  ├─ pages/
│  └─ styles/
└─ .github/workflows/deploy.yml
```

## 分阶段实施

### Phase 0

- 初始化 Astro、TypeScript、MDX、Sitemap、RSS。
- 新增 GitHub Pages 构建发布工作流。
- 建立基础全局样式、布局与 SEO 组件。

### Phase 1

- 建立 `blog`、`projects`、`pages` content collections。
- 从 `/_posts` 复制旧文章进入 `src/content/blog/`。
- 新增 `about` 页面内容文件。

### Phase 2

- 实现首页、博客列表、博客详情、项目列表、项目详情、标签归档、404 页面。
- 文章详情页支持目录、标签、上一篇/下一篇、特色头图。
- 首页从时间流升级为“精选项目 + 最新文章 + 标签入口”。

### Phase 3

- 将重点项目单独建模到 `projects` collection。
- 为项目页增加状态、技术栈、仓库链接、关联文章。
- 统一 metadata、canonical、Open Graph、JSON-LD 输出。

### Phase 4

- 图片切换为 Astro 组件或预压缩资源。
- 视频增加 poster、预加载策略。
- 补全文站搜索、Mermaid、相关文章、阅读时长、更新时间等增强能力。

## 当前回合落地范围

本轮直接完成：

1. Astro 配置与依赖清单。
2. 内容 schema 与站点数据文件。
3. 核心布局与组件。
4. 首版首页、about、blog、projects、tags、404、RSS。
5. 旧文章复制入新的 `blog` collection。
6. GitHub Pages 部署工作流。

## 后续待办

- 将 `ScriboBot` 从普通 markdown 提升为 MDX + Mermaid 组件。
- 统一图片 alt 文本与封面策略。
- 压缩 `img/` 和 `videos/` 中的大资源。
- 添加搜索与评论系统。
