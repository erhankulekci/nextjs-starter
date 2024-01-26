import React from "react";
import { Footer, Header, Sidebar } from "@/components/";
import "@/app/globals.css";
import { Locale } from "@/root/i18n.config";

const PortalLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) => {
    return (
        <div style={{ zoom: "0.95 !important" }}>
            <Header lang={params.lang} />
            <div style={{ display: "flex", marginTop: "70px" }}>
                <Sidebar lang={params.lang} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        marginLeft: "-22px",
                        minHeight: "calc(100vh - 270px)"
                    }}
                >
                    <div
                        style={{
                            padding: "1.5rem 2.5rem",
                            flexGrow: "1",
                            background: "rgb(241, 241, 247)"
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
            <Footer lang={params.lang} />
        </div>
    );
};

export default PortalLayout;
