const { default: ReduxProvider } = require("@/provider");

async function CommonLayout({ children }) {
    return <ReduxProvider>{children}</ReduxProvider>
}

export default CommonLayout;