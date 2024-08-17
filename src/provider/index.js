"use client"

import { Provider } from 'react-redux'
import store from '@/store'
import Header from '@/components/header'

/**
 * Component này nằm trong CommonLayout.jsx
 * Đoạn code lúc đầu
 */

// export default function ReduxProvider({ children, getSession }) {
//     return (
//         <Provider store={store}>
//             <Header getSession={getSession}/>
//             {children}
//         </Provider>
//     )
// }

/**
 * Đoạn code sửa lại
 */
export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

// export default function ReduxProvider({ children }) {
//     return (
//         <Provider store={store}>
//             <Header/>
//             {children}
//         </Provider>
//     )
// }