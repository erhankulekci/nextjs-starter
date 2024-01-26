import React from "react";
import { LoadingProvider, Providers, ToastProvider } from "@/providers";
import { Locale } from "@/root/i18n.config";
import type { Metadata } from "next";
import "@/app/globals.css";
import { poppins } from "@/styles/fonts";

export const metadata: Metadata = {
    title: "Starter Project",
    description: ""
};

const Layout = ({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) => {
    return (
        <html lang={params.lang} className={`${poppins.variable}`}>
            <body>
                <Providers>
                    <LoadingProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </LoadingProvider>
                </Providers>
            </body>
        </html>
    );
};

export default Layout;
