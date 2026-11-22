# 打工人精神状态鉴定所

面向手机浏览器的职场趣味测试。使用 React、TypeScript 和 Vite 独立构建。完成 6 道情景题后，可以查看六类得分、原创角色报告和默契搭档，还能复制答案组合或导出 1080 × 1440 PNG 分享卡。

首版用于内部体验。未来可在小红书试验 ¥0.99 的售卖定价。当前版本无支付、订单验证或访问控制，也无服务端、数据库或 AI 接口。测试仅供娱乐，不作为专业心理测评。

## 本地运行

使用 Node.js 22.18 或更高版本，推荐 Node.js 24。

```sh
npm ci
npm run dev
```

浏览器打开终端显示的地址，默认是 `http://localhost:5173/`。同一 Wi-Fi 下想用手机访问时，运行 `npm run dev -- --host 0.0.0.0`，打开终端显示的 Network 地址。

```sh
npm test
npm run build
npm run preview
```

`npm test` 校验合法答案、并列规则和全部 4,096 种组合。`npm run build` 先检查 TypeScript，再生成 `dist/`。`npm run preview` 用于本地查看构建产物。

## GitHub Pages 部署

1. 在 GitHub 新建仓库，将解压后的项目文件（含 `.github/`）提交到 `main` 分支。
2. 打开仓库 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。
3. 打开 **Actions → Deploy to GitHub Pages**，选择 **Run workflow**。之后推送到 `main` 也会触发流程。工作流先运行评分测试和生产构建，通过后部署 `dist/`。
4. 在 Actions 部署结果或 Settings → Pages 打开站点。仓库子路径和自定义域名都可使用现有的相对资源路径配置。

页面使用 URL 的 hash 保存结果，例如 `#result=ACDBCA`。复制该页面地址即可在同一部署站点重新打开结果。若在 Pages 上分享链接，收到链接的人也可以看到答案组合。暂未完成的答题进度仅保存在当前浏览器标签页的会话中。所有图片资源随应用一起部署。

参考 [GitHub Pages 发布源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) 和 [Vite 静态部署指南](https://vite.dev/guide/static-deploy.html)。

## 内容和代码

| 文件 | 内容 |
| --- | --- |
| `src/model/quiz.ts` | 题目、选项及对应的人格，六份独立结果、配色和默契搭档 |
| `src/model/scoring.ts` | 每题加 1 分。最高分并列时，从第 6 题倒查，取最近选中的并列人格 |
| `src/model/session.ts` | 读取答题进度和结果链接 |
| `src/assets/` | 办公室群像、六张原创角色肖像及角色资源映射 |
| `src/components/shareCard.ts` | 用 Canvas 本地绘制独立排版的 PNG |
| `tests/scoring.test.ts` | 评分规则及全组合测试 |

角色图使用内置 ImageGen 生成。封面提示词使用奶油色办公室微缩场景、薄荷配件、暖光和六只软绒潮玩，依次设计为戴圆眼镜的猫、托腮的垂耳兔、操作键盘的仓鼠、抱文件的水豚、端水杯的柴犬和喝茶的绵羊。肖像提示词以群像作为造型参考，同一镜头和光线下按 3 列 × 2 行生成单人特写，使用薄荷绿、暖粉、淡紫、蜜桃黄、奶黄和天蓝六种独立背景。
