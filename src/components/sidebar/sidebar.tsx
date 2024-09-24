"use client";
import React, { useEffect, useRef, useState } from "react";
import { Backdrop } from "@sphinx-ui/core";
import { Locale } from "@/root/i18n.config";
import { getTranslate } from "@/lib";
import { useAppSelector, useAppDispatch } from "@/redux//hooks";
import { showSidebar, setShowSidebar } from "@/redux/slices/sidebarSlice";
import styles from "./sidebar.module.css";
import { Home, Icons } from "@gib-ui/icons";
import Cookies from "universal-cookie";
import { customization } from "@/redux/slices/customizationSlice";
import { useWindowSize } from "@/hooks";
import { navigate } from "@/utils/navigate";
import SideMenu from "./sideMenu";
import { Logo } from "../header/components";

const Sidebar = ({ lang }: { lang: Locale }) => {
    const hasLoginPage = process.env.NEXT_PUBLIC_HASLOGINPAGE === "true";
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
            icon: <Icons.Analytics sx={iconStyle} />,
            url: `/${lang}/portal/sample-page-1`,
            children: [
                {
                    id: "1.1",
                    label: "label 1.1"
                },
                {
                    id: "1.2",
                    label: "label 1.2"
                },
                {
                    id: "1.3",
                    label: "label 1.3"
                },
                {
                    id: "1.4",
                    label: "label 1.4"
                }
            ]
        },
        {
            id: "2",
            label: navigation.page2,
            icon: <Icons.Adb sx={iconStyle} />,
            url: `/${lang}/portal/sample-page-2`
        },
        {
            id: "3",
            label: navigation.page3,
            icon: <Icons.Adb sx={iconStyle} />,
            url: `/${lang}/portal/sample-page-3`
        }
    ];

    const handleItemClick = (item: any) => {
        if (item.url) {
            navigate(item.url);
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
        navigate(`/${lang}/login`);
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
                            logo={<Logo />}
                            closeIcon
                            closeIconOnClick={() => dispatch(setShowSidebar(false))}
                            showActionButton={hasLoginPage}
                            actionButtonLabel={navigation?.logoutButton}
                            onAction={handleLogout}
                            menuSearch
                            customStyles={{
                                sideMenuContainer: {
                                    minHeight: "110vh !important",
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
                    isSmallMenu={true}
                    customStyles={{
                        sideMenuContainer: {
                            width: "350px",
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
