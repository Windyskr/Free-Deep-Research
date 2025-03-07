# Free Deep Research

[English](/README.md)

## 快速部署在 Cloudflare Pages

[https://github.com/Windyskr/Free-Deep-Research/issues/1](https://github.com/Windyskr/Free-Deep-Research/issues/1)

## 本地开发

首先，在根目录创建 .env 文件
```
OPENAI_BASE_URL=https://api.xxx.com/v1/
OPENAI_API_KEY=sk-xxx
OPENAI_MODEL=deepseek-r1
TAVILY_KEY=tvly-xxxx # 从 https://tavily.com/ 获取

NEXT_PUBLIC_BASE_URL=/api/v1/chat/completions
NEXT_PUBLIC_SEARCH_URL=/api/search
```

其次，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

用浏览器打开 [http://localhost:3000](http://localhost:3000) 即可看到结果。

你可以通过修改 `app/page.tsx` 来开始编辑页面。当你编辑文件时，页面会自动更新。

本项目使用 [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) 来自动优化和加载 Inter，这是一个自定义的 Google 字体。

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的特性和 API。
- [学习 Next.js](https://nextjs.org/learn) - 一个交互式的 Next.js 教程。

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js/) - 欢迎你的反馈和贡献！

感谢 [TencentEdgeOne](https://github.com/TencentEdgeOne/)

This project is licensed under the MIT License