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

### Set-up redux
- B1: Tạo folder store (trong folder src)
- B2: Tạo folder slices chứa các slice (trong folder store)
- B3: Tạo file cart-slice.js

```jsx
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {

        },
        removeFromCart(state, action) {

        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
```

- B4: Tạo file index.js trong folder store (để kết hợp nhiều reducers trong một)

```jsx
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '@/store/slices/cart-slice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

export default store;
```

- B5: Tạo folder provider (bên trong folder src) và bên trong nó là file index.js

```jsx
"use client"

import { Provider } from 'react-redux'
import store from '@/store'

export default function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>
}
```

- Đoạn mã này tạo ra một component ReduxProvider để bao bọc các component khác trong ứng dụng React, cho phép chúng truy cập vào Redux store thông qua context API của React. Đây là một cách để thiết lập Redux trong ứng dụng React để quản lý trạng thái toàn cục.


- B6: Tạo 1 folder là common-layout bên trong folder components (folder components nằm trong folder src)

```jsx
const { default: ReduxProvider } = require("@/provider");

async function CommonLayout({ children }) {
    return <ReduxProvider>{children}</ReduxProvider>
}

export default CommonLayout;
```

- B7: Vào file layout.js (bên trong folder app)

- Ban đầu

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- Sau khi Layout chứa redux store

```jsx
import CommonLayout from "@/components/common-layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
```

### Tạo Header và cách đặt nó đúng vị trí

- B1: Tạo folder header bên trong components

```jsx
'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <header className='flex shadow-md py-4 px-4 bg-white min-h-[70px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <Link href={"/"}>Shopping Cart</Link>
            </div>
            <ul className='flex gap-6 items-center justify-center mr-10'>
                <li className='text-lg font-semibold'>
                    <Link href={'/'}>Products</Link>
                </li>
                <li className='text-lg font-semibold'>
                    <Link href={'/cart'}>Cart</Link>
                </li>
            </ul>
            <div className='flex space-x-3'>
                <form>
                    <Button>Login</Button>
                </form>
            </div>
        </header>
    )
}

export default Header
```
- B2: Di chuyển đến file index.js bên trong folder provider và sửa lại như bên dưới

```jsx
export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <Header />
            {children}
        </Provider>
    )
}
```

## Xem các reducers có trong store (Xem chi tiết bên trong add-to-cart trong folder component)

```jsx
const getState = useSelector(state => state);
console.log("getState: ", getState); // { cart: { cartItems: Array(0) } }
```

## Lấy 1 reducers và state trong nó

```jsx
const { cart } = useSelector(state => state);
console.log(cart?.cartItems); // []
```

### Giải thích về some

```jsx
cart?.cartItems.some((item) => item.id === productItem.id):
```

- some là một phương thức của mảng, nó sẽ kiểm tra xem có ít nhất một phần tử trong mảng thỏa mãn điều kiện được cung cấp hay không.
- Ở đây, phương thức some được sử dụng để kiểm tra xem có bất kỳ mục nào trong cartItems có id trùng với productItem.id hay không.
- Nếu tìm thấy một mục có id trùng khớp, some sẽ trả về true, ngược lại, nó sẽ trả về false.

###  Thêm 1 sản phẩm và mảng

- B1: Kiểm tra xem product đã có trong Cart hay chưa bằng hàm some

```jsx
const AddToCartButton = ({ productItem }) => {

    const { cart } = useSelector(state => state);
    console.log(cart?.cartItems);

    return (
        <div className="mt-8 max-w-md">
            <Button>
                {
                    cart?.cartItems.some((item) => item.id === productItem.id) ? "Remove from cart" : "Add to cart"
                }
            </Button>
        </div>
    )
}
```

- B2: Khởi tạo logic thực hiện thêm hay xóa

```jsx
const dispatch = useDispatch();

const handleAddToCart = () => {
    dispatch(addToCart(productItem))
}

const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productItem?.id))
}

<Button onClick={cart?.cartItems.some((item) => item.id === productItem.id) ? handleRemoveFromCart : handleAddToCart}>
    {
        cart?.cartItems.some((item) => item.id === productItem.id) ? "Remove from cart" : "Add to cart"
    }
</Button>
```

- B3: Sửa lại ở cart-slice.js

```jsx
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // console.log(state, action);
            state.cartItems.push(action.payload)
        },
        removeFromCart(state, action) {
            let cpyCartItems = [...state.cartItems];
            cpyCartItems = cpyCartItems.filter((item) => item.id !== action.payload)
            state.cartItems = cpyCartItems

            return state;
            // console.log(action.payload);
        }
    }
})
```

### Giải thích về flex-shrink: 0

- flex-shrink là một thuộc tính trong CSS thuộc module Flexbox, xác định khả năng thu nhỏ của một mục (flex item) bên trong một container flex. Khi sử dụng flex-shrink: 0, điều này có nghĩa là mục đó sẽ không bao giờ thu nhỏ kích thước của nó, ngay cả khi container flex không đủ chỗ để chứa tất cả các mục bên trong.
- Giải thích chi tiết:
- flex-shrink: 0:
- Thuộc tính flex-shrink kiểm soát khả năng mục thu nhỏ kích thước của nó khi container flex nhỏ hơn tổng kích thước của tất cả các mục.
- Giá trị 0 có nghĩa là mục sẽ không bao giờ thu nhỏ kích thước của nó, nó sẽ giữ nguyên kích thước ban đầu được xác định bởi thuộc tính width hoặc height (nếu có).
- Ngược lại, nếu bạn đặt flex-shrink: 1 (giá trị mặc định), mục sẽ có thể thu nhỏ khi cần thiết để phù hợp với kích thước của container.

# Ví dụ sử dụng:
- Giả sử bạn có một container flex với ba mục bên trong:

```jsx
<div class="container">
  <div class="item item-1">Item 1</div>
  <div class="item item-2">Item 2</div>
  <div class="item item-3">Item 3</div>
</div>
```

- CSS

```css
.container {
  display: flex;
  width: 300px;
}

.item {
  width: 150px;
  border: 1px solid black;
}

.item-1 {
  flex-shrink: 0; /* Item 1 sẽ không thu nhỏ */
}
```

# Trong ví dụ này:

- container có chiều rộng 300px.
- Mỗi mục (item) có chiều rộng 150px.
- item-1 có flex-shrink: 0, có nghĩa là nó sẽ không thu nhỏ.
- Khi container không đủ chỗ (450px > 300px), item-2 và item-3 sẽ thu nhỏ để phù hợp với chiều rộng của container, nhưng item-1 sẽ giữ nguyên kích thước ban đầu của nó là 150px.

# Tổng kết:
- flex-shrink: 0 ngăn một mục flex thu nhỏ kích thước của nó.
- Điều này hữu ích khi bạn muốn một mục giữ nguyên kích thước trong một container có thể thay đổi kích thước.
- Các mục khác trong container flex sẽ thu nhỏ (hoặc mở rộng) để phù hợp với kích thước container.

## Table trong project

```jsx
<div className='overflow-y-auto'>
    <table className='mt-12 w-full border-collapse divide-y'>
        <thead className='whitespace-nowrap text-left'>
            <tr>
                <th className='text-base text-gray-700 p-4'>Title</th>
                <th>Price</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody className='whitespace-nowrap divide-y'>
            {
                cart?.cartItems.map((item) => (
                    <tr key={item.id}>
                        <td className='py-5 px-4'>
                        <div className='flex items-center gap-6 w-max'>
                            <div className='h-36 shrink-0'>
                                <img 
                                    src={item?.thumbnail}
                                    alt={item?.title}
                                    className='w-full h-full object-contain'
                                />
                            </div>
                            <div>
                                <p className='text-lg font-bold text-black'>
                                    {item?.title}
                                </p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p>{item?.price}</p>
                        </td>
                        <td className='py-5 px-4'>
                            <Button>Remove</Button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
</div>
```

## Giải thích về object-contain
- 'object-contain': Đảm bảo rằng hình ảnh sẽ được co giãn để vừa với phần tử chứa mà không làm biến dạng hình ảnh. Tỷ lệ của hình ảnh sẽ được giữ nguyên và các vùng không sử dụng sẽ được lấp đầy bởi khoảng trống (thường là màu nền của phần tử chứa).

## Đăng nhập, đăng ký bằng github

- B1: Vào file index.js trong actions

```jsx
import { signIn } from "@/auth";

export async function loginAction() {
    await signIn('github')
}

export async function logoutAction() {
    await signOut();
}
```

- B2: Vào folder header và bổ sung

```jsx
import { loginAction } from '@/actions'

const handleAuthSignIn = async() => {
    await loginAction()
}

<form action={handleAuthSignIn}>
    <Button type="submit">Login</Button>
</form>
```

-> Nếu nó đòi Authorize thì thành công

# Thêm loading mỗi khi chuyển sang trang khác mà ta chưa vào trước đây, những trang đã từng vào sẽ không còn hiện ra
- Thêm file loading.jsx (Không cần phải Suspense như video trước và nó sẽ tự hiện)

```jsx
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <Skeleton className="w-full min-h-screen bg-black rounded-full" />
    )
}

export default Loading
```

# Vấn đề : Sau khi Authorize thành công thì hiện button Logout

- B1: Lấy ra Section (thông tin của user và thời gian hết hạn của section đó trong Home.jsx sau khi người dùng đăng nhập thành công bằng github như trên) và đặt đoạn code lên đầu

```jsx
import { auth } from "@/auth";

const getSession = await auth();
console.log(getSession);
```

- B2: Thêm logic nếu người dùng chưa đăng nhập thì phải chuyển sang trang cảnh báo chưa đăng nhập

```jsx
if(!getSession?.user) redirect("/unauth-page");
```

- B3: Copy đoạn code trên vào các trang như productDetails, Cart, Home, ...

- B4: Copy đoạn code đó vào trong CommonLayout

- Ban đầu

```jsx
function CommonLayout({ children }) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}

export default CommonLayout;
```

- Sau khi sửa

```jsx
async function CommonLayout({ children }) {

    const getSession = await auth();

    return (
        <ReduxProvider getSession={getSession}>
            {children}
        </ReduxProvider>
    )
}

export default CommonLayout;
```

- B5: Sửa lại Redux Provider

- Ban đầu

```jsx
"use client"

import { Provider } from 'react-redux'
import store from '@/store'
import Header from '@/components/header'

export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <Header />
            {children}
        </Provider>
    )
}
```

- Sau khi sửa

```jsx
"use client"

import { Provider } from 'react-redux'
import store from '@/store'
import Header from '@/components/header'

export default function ReduxProvider({ children, getSession }) {
    return (
        <Provider store={store}>
            <Header getSession={getSession}/>
            {children}
        </Provider>
    )
}
```
- B6: Sửa lại Header.jsx

- Ban đầu

```jsx
const Header = () => {

    const handleAuthSignIn = async() => {
        await loginAction()
    }

    ...
}
```

= Sau khi sửa

```jsx
const Header = ({getSession}) => {

    console.log("setSession in header", getSession);

    const handleAuthSignIn = async() => {
        await loginAction()
    }
}
```

- B7: Sau khi có sesion thì đổi button Login sang Logout

- Ban đầu

```jsx
<form action={handleAuthSignIn}>
    <Button type="submit">Login</Button>
</form>
```

- Sau khi sửa

```jsx
const handleOauthSignOut = async() => {
    await logoutAction()
}

<form action={getSession?.user ? handleOauthSignOut : handleOauthSignIn}>
    <Button type="submit">
        {
            getSession?.user ? "Logout" : "Login"
        }
    </Button>
</form>
```

- B8: Trong trường hợp người dùng đã đăng nhập bằng tài khoản github thì khi vào unauth-page sễ được chuyển hướng sang Home pape

```jsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const UnauthPage = async () => {

    const getSession = await auth();
    if(getSession?.user) redirect("/");

    return (
        <div className='p-20'>
            <h2 className='text-6xl font-extrabold'>
                You are not logged in. Please login
            </h2>
        </div>
    )
}

export default UnauthPage
```

### Ta muốn đảm bảo chắc chắn khi chuyển trang sẽ có loading thì phải bổ sung loading bằng Suspense trong CommonLayout

```jsx
async function CommonLayout({ children }) {

    const getSession = await auth();

    return (
        <ReduxProvider getSession={getSession}>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </ReduxProvider>
    )
}

export default CommonLayout;
```