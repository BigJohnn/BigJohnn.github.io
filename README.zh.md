# BigJohnn.github.io

当前仓库已进入从 Jekyll 迁移到 Astro 的阶段。

## 现状

- 旧版 Jekyll 文件仍保留在仓库根目录，便于对照和继续迁移。
- 新版 Astro 站点代码位于 `src/`。
- 已迁移文章位于 `src/content/blog/`。
- 结构化项目页位于 `src/content/projects/`。
- 静态资源由 `public/` 提供。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

GitHub Pages 工作流位于 `.github/workflows/deploy.yml`。

## 迁移说明

- 迁移蓝图文档：`docs/astro-migration-plan.md`
- 旧文章 URL 已兼容为 `/YYYY/MM/DD/slug/`
- 旧 Jekyll 文件暂未删除，后续可继续分批迁移
