# Free Deep Research

[中文](/README_zh-CN.md)

## Getting Started

First, create a .env file in root
```
OPENAI_BASE_URL=https://api.xxx.com/v1/
OPENAI_API_KEY=sk-xxx
OPENAI_MODEL=deepseek-r1
TAVILY_KEY=tvly-xxxx # get from https://tavily.com/

NEXT_PUBLIC_BASE_URL=/api/v1/chat/completions
NEXT_PUBLIC_SEARCH_URL=/api/search
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

Thanks [TencentEdgeOne](https://github.com/TencentEdgeOne/)

This project is licensed under the MIT License