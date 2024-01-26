"use client";
import styles from "./header.module.css";
import { Locale } from "@/root/i18n.config";
import { useAppSelector } from "@/redux//hooks";

import { customization } from "@/redux/slices/customizationSlice";
import { Logo, Navigation, Search } from "./components";
import CustomizationDrawer from "./components/customizationDrawer";
import { useState } from "react";
import DrawerOpener from "./components/drawerOpener";

const Header = ({ lang }: { lang: Locale }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const customizationStyles = useAppSelector(customization);

    return (
        <>
            <header
                className={styles.header}
                style={{
                    background: customizationStyles.headerBgColor
                }}
            >
                <Logo lang={lang} />
                <Search lang={lang} />
                <Navigation lang={lang} />

                <DrawerOpener
                    setIsOpen={setIsDrawerOpen}
                    customizationStyles={customizationStyles}
                />
            </header>
            <CustomizationDrawer
                isOpen={isDrawerOpen}
                setIsOpen={setIsDrawerOpen}
                customizationStyles={customizationStyles}
                lang={lang}
            />
        </>
    );
};

export default Header;
