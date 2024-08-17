import React from "react";
import ReactDOM from "react-dom/client";
import './global.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {AccountPage} from "@/pages/AccountPage.tsx";
import {MobileLayout} from "@/layouts/MobileLayout.tsx";
import {ExplorePage} from "@/pages/ExplorePage.tsx";
import {SettingsPage} from "@/pages/SettingsPage.tsx";
import {ActivityPage} from "@/pages/ActivityPage.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {WalletProvider} from "@txnlab/use-wallet-react";
import {manager} from '@/lib/manager.ts'
import {QueryClientProvider} from "@tanstack/react-query";
import {query} from "@/lib/query.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "@/components/ui/toaster.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MobileLayout/>,
        children: [
            {
                index: true,
                element: <AccountPage/>
            },
            {
                path: "explore",
                element: <ExplorePage/>
            },
            {
                path: "activity",
                element: <ActivityPage/>
            },
            {
                path: "settings",
                element: <SettingsPage/>
            },
        ]
    },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <WalletProvider manager={manager}>
                <QueryClientProvider client={query}>
                    <RouterProvider router={router}/>
                    <ReactQueryDevtools buttonPosition="top-left"/>
                    <Toaster />
                </QueryClientProvider>
            </WalletProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
