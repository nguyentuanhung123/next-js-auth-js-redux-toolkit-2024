import Loading from "@/app/loading";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Header from "../header";

const { default: ReduxProvider } = require("@/provider");

async function CommonLayout({ children }) {

    const getSession = await auth();

    return (
        // <ReduxProvider getSession={getSession}>
        //     <Suspense fallback={<Loading />}>
        //         {children}
        //     </Suspense>
        // </ReduxProvider>
        <ReduxProvider>
            <Header getSession={getSession} />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </ReduxProvider>
    )
}

export default CommonLayout;