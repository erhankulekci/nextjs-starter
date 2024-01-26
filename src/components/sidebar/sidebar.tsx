"use client";
import React, { useEffect, useRef, useState } from "react";
import { Backdrop, SideMenu, useWindowSize } from "@gib-ui/core";
import { useRouter } from "next/navigation";
import { Locale } from "@/root/i18n.config";
import { getTranslate } from "@/lib";
import { useAppSelector, useAppDispatch } from "@/redux//hooks";
import { showSidebar, setShowSidebar } from "@/redux/slices/sidebarSlice";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { Home } from "@gib-ui/icons";
import Cookies from "universal-cookie";
import { customization } from "@/redux/slices/customizationSlice";
import AdbIcon from "@mui/icons-material/Adb";
import AnalyticsIcon from "@mui/icons-material/Analytics";
const Sidebar = ({ lang }: { lang: Locale }) => {
    const hasLoginPage = process.env.NEXT_PUBLIC_HASLOGINPAGE === "true";
    const router = useRouter();
    const cookies = new Cookies();
    const { width } = useWindowSize();
    const { navigation } = getTranslate(lang);
    const show = useAppSelector(showSidebar);
    const customizationStyles = useAppSelector(customization);

    const dispatch = useAppDispatch();
    const [sidebarMobile, setSidebarMobile] = useState<boolean>(width < 1200);
    const sidebarContentRef = useRef<HTMLDivElement | null>(null);

    const iconStyle = {
        width: 18,
        height: 18
    };

    const menuItems = [
        { id: "0", label: navigation.home, icon: <Home />, url: `/${lang}/portal` },
        {
            id: "1",
            label: navigation.page1,
            icon: <AnalyticsIcon sx={iconStyle} />,
            url: `/${lang}/portal/sample-page-1`
        },
        {
            id: "2",
            label: navigation.page2,
            icon: <AdbIcon sx={iconStyle} />,
            url: `/${lang}/portal/sample-page-2`
        },
        {
            id: "3",
            label: navigation.page3,
            icon: <AdbIcon sx={iconStyle} />,
            url: `/${lang}/portal/sample-page-3`
        }
    ];

    const handleItemClick = (item: any) => {
        if (item.url) {
            router.push(item.url);
        }
        dispatch(setShowSidebar(false));
    };

    useEffect(() => {
        if (width <= 1200) {
            setSidebarMobile(true);
            dispatch(setShowSidebar(false));
        } else {
            setSidebarMobile(false);
            dispatch(setShowSidebar(true));
        }
    }, [width]);

    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        router.push(`/${lang}/login`);
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarMobile && show) {
            // Check if the click occurred inside the sidebar content
            if (
                sidebarContentRef.current &&
                sidebarContentRef.current.contains(event.target as Node)
            ) {
                // Click occurred inside the sidebar content, do not close the sidebar
                return;
            }
            // Click occurred outside the sidebar content, close the sidebar
            dispatch(setShowSidebar(false));
        }
    };

    const sidebarStyled = () => {
        if (sidebarMobile) {
            return (
                <Backdrop
                    open={Boolean(sidebarMobile && show)}
                    onClick={handleBackdropClick as any}
                >
                    <div className={styles.sidebarMobile} ref={sidebarContentRef}>
                        <SideMenu
                            menuItems={menuItems}
                            onItemClick={handleItemClick}
                            logo={
                                <Image
                                    src={width < 600 ? "/Logo-light-mini.svg" : "/Logo-light.svg"}
                                    width={230}
                                    height={35}
                                    alt="logo"
                                />
                            }
                            closeIcon
                            closeIconOnClick={() => dispatch(setShowSidebar(false))}
                            showActionButton={hasLoginPage}
                            actionButtonLabel={navigation?.logoutButton}
                            onAction={handleLogout}
                            menuSearch
                            customStyles={{
                                sideMenuContainer: {
                                    minHeight: "110vh !important",
                                    // background: "linear-gradient(180deg, #2A80B9 0%, #2D3F51 100%)"
                                    background: customizationStyles.sidebarBgColor
                                },
                                textFieldFormControlStyle: {
                                    width: "200px"
                                },
                                actionButtonStyles: {
                                    padding: "2rem",
                                    position: "absolute",
                                    width: "300px",
                                    bottom: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: customizationStyles.sidebarBgColor
                                }
                            }}
                        />
                    </div>
                </Backdrop>
            );
        } else {
            return (
                <SideMenu
                    menuItems={menuItems}
                    onItemClick={handleItemClick}
                    menuSearch
                    //initiallySmallMenu will be working after version 0.0.45
                    initiallySmallMenu={true}
                    customStyles={{
                        sideMenuContainer: {
                            width: "350px",
                            // background: "linear-gradient(180deg, #2A80B9 0%, #2D3F51 100%)",
                            background: customizationStyles.sidebarBgColor,
                            minHeight: "80vh !important"
                        },
                        textFieldFormControlStyle: {
                            width: "270px"
                        },

                        mobileSubMenuItem: {
                            height: undefined
                        },
                        actionButtonStyles: {
                            padding: "2rem",
                            position: "absolute",
                            width: "350px",
                            bottom: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "#0A808B"
                            backgroundColor: customizationStyles.sidebarBgColor
                        }
                    }}
                />
            );
        }
    };
    if (customizationStyles.hasSidebar) return <>{sidebarStyled()}</>;
    else return;
};

export default Sidebar;
