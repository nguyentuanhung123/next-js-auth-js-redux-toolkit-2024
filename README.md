This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Set-up project
- B1: npx shadcn-ui@latest init
- B2: npm install @reduxjs/toolkit
- B3: npm install react-redux
- B4: npm install next-auth@beta
- B5: npx auth secret

### Auth.js https://authjs.dev/getting-started

## What is Auth.js?

- Auth.js là một thư viện không phụ thuộc vào thời gian chạy dựa trên các API Web chuẩn tích hợp sâu với nhiều khuôn khổ JavaScript hiện đại để cung cấp trải nghiệm xác thực dễ bắt đầu, dễ mở rộng và luôn riêng tư và an toàn!

- Tài liệu này bao gồm next-auth@5.0.0-beta trở lên và tất cả các khuôn khổ khác trong không gian tên @auth/*. Tài liệu cho next-auth@4.x.y vẫn có thể được tìm thấy tại next-auth.js.org.

- Chọn khuôn khổ bạn muốn bắt đầu hoặc xem triển khai ứng dụng hoặc kho lưu trữ mẫu bằng các nút bên dưới.

### Setup Auth and Github : https://authjs.dev/guides/configuring-github

### Setup Github

- B1: Vào github => Settings -> Developer settings
- B2: Chọn OAuth Apps -> Nhấn button được hiện 
- B3: Điền thông tin chi tiết
- Application name: next-auth-redux-toolkit
- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/auth/callback/github
- B4: Nhấn Register application
- B5: npx auth secret (tạo thành công file .env.local với AUTH_SECRET bên trong, nếu không có thì copy AUTH_SECRET bên dưới terminal và paste vapf file .env.local)
- B6: Thêm 2 biến AUTH_GITHUB_ID và AUTH_GITHUB_SECRET bên dưới AUTH_SECRET
- B7: Tạo file auth.js trong thư mục src

```jsx
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [Github]
});
```

- B8: Tạp folder [...nextauth] (bên trong chứa file route.js và folder nằm trong thư mục api)

```jsx
export { GET, POST } from '@/auth'
```

- B9: Tạo file middleware.js (bên trong folder src)

```jsx
export { auth as middleware } from '@/auth'
```