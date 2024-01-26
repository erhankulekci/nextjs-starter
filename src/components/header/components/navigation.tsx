"use client";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import styles from "../header.module.css";
import LocaleSwitcher from "../localeSwitcher";
import { Locale } from "@/root/i18n.config";
import { getTranslate } from "@/lib";
import { Badge, Grid, Typography, useWindowSize } from "@gib-ui/core";
import { useAppSelector, useAppDispatch } from "@/redux//hooks";
import { showSidebar, setShowSidebar } from "@/redux/slices/sidebarSlice";
import { Icons } from "@gib-ui/icons";
import { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import NotificationCard from "./notificationCard";
import { customization } from "@/redux/slices/customizationSlice";

const Navigation = ({ lang }: { lang: Locale }) => {
    const [isNotificationsOpened, setIsNotificationsOpened] = useState<boolean>(false);
    const hasLoginPage = process.env.NEXT_PUBLIC_HASLOGINPAGE === "true";
    const cookies = new Cookies();
    const router = useRouter();
    const { width } = useWindowSize();
    const { navigation } = getTranslate(lang);
    const show = useAppSelector(showSidebar);
    const customizationStyles = useAppSelector(customization);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        router.push(`/${lang}/login`);
    };
    const openNotifications = () => {
        setIsNotificationsOpened(!isNotificationsOpened);
    };
    return (
        <ClickAwayListener onClickAway={() => setIsNotificationsOpened(false)}>
            <nav className={styles.nav}>
                {hasLoginPage && width >= 1200 && (
                    <>
                        <Badge
                            sx={{
                                cursor: "pointer",
                                "& .MuiBadge-dot": {
                                    backgroundColor: customizationStyles.primaryLightColor
                                }
                            }}
                            badgeContent={7}
                            variant="dot"
                            onClick={openNotifications}
                        >
                            <Icons.Notifications sx={{ color: "white" }} fontSize="large" />
                        </Badge>
                        {isNotificationsOpened && <NotificationCard />}
                        <Grid item className={styles.user}>
                            <Icons.AccountBox sx={{ color: "white" }} fontSize="large" />
                            <Typography noWrap>User Name</Typography>
                        </Grid>
                        <button className={styles.button} onClick={handleLogout}>
                            <Icons.Logout />
                            {navigation?.logoutButton}
                        </button>
                    </>
                )}
                <LocaleSwitcher />
                {width < 1200 && (
                    <button
                        className={styles.menuButton}
                        onClick={() => dispatch(setShowSidebar(!show))}
                    >
                        {width < 1200 && show ? (
                            <Icons.MenuOpen fontSize="large" />
                        ) : (
                            <Icons.Menu fontSize="large" />
                        )}
                    </button>
                )}
            </nav>
        </ClickAwayListener>
    );
};

export default Navigation;
