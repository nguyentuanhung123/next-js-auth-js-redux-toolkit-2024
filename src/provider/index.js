"use client"

import { Provider } from 'react-redux'
import store from '@/store'
import Header from '@/components/header'

/**
 * Component này nằm trong CommonLayout.jsx
 */

export default function ReduxProvider({ children, getSession }) {
    return (
        <Provider store={store}>
            <Header getSession={getSession}/>
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