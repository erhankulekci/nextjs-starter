import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, FormControl, ClickAwayListener, Grid } from "@gib-ui/core";
import { sideMenuStyles as styles } from "./sideMenuStyles";
import { useWindowSize } from "@/hooks";
import { Icons } from "@gib-ui/icons";

export interface SideMenuItemProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    children?: SideMenuItemProps[];
    favouriteLinks?: { id: string; label: string }[];
}

export interface SideMenuProps {
    menuItems: SideMenuItemProps[];
    onItemClick: (child: object) => void;
    favouriteLinks?: { id: string; label: string }[];
    favouriteLinksTitle?: React.ReactNode;
    menuSearch?: boolean;
    isSmallMenu?: boolean;
    onAction?: () => void;
    showActionButton?: boolean;
    actionButtonLabel?: string;
    logo?: React.ReactElement;
    closeIcon?: boolean;
    closeIconOnClick?: () => void;
    onMegaMenuSearchChange?: (e: any) => void;
    onSideMenuSearchChange?: (e: any) => void;
    onSideMenuStateChange?: () => void;
    onCustomClickAway?: () => void;
    mobileMenuScreenWidthPx?: number;
    smallMenuButtonOnClick?: () => void;
    megaMenuSearchPlaceholder?: string;
    sideMenuSearchPlaceholder?: string;
    customStyles?: {
        sideMenuContainer?: any;
        textFieldFormControlStyle?: any;
        mobileSubMenuItem?: React.CSSProperties;
        actionButtonStyles?: React.CSSProperties;
    };
}

const MenuItemComponent: React.FC<{
    item: SideMenuItemProps;
    key: any;
    onItemClick: (child: object) => void;
    favouriteLinks?: { id: string; label: string }[];
    favouriteLinksTitle?: string | React.ReactNode;
    smallMenu: boolean;
    setSmallMenu?: React.Dispatch<React.SetStateAction<boolean>>;
    mobileMenuScreenWidth?: number;
    menuSearch?: boolean;
    onMegaMenuSearchChange?: (e: any) => void;
    onSideMenuStateChange?: () => void;
    megaMenuSearchPlaceholder?: string;
    onCustomClickAway?: () => void;
    customStyles?: {
        sideMenuContainer?: any;
        textFieldFormControlStyle?: any;
        mobileSubMenuItem?: React.CSSProperties;
        actionButtonStyles?: React.CSSProperties;
    };
}> = ({
    item,
    onItemClick,
    key,
    favouriteLinks,
    favouriteLinksTitle,
    smallMenu,
    setSmallMenu,
    menuSearch,
    onMegaMenuSearchChange,
    onSideMenuStateChange,
    megaMenuSearchPlaceholder,
    mobileMenuScreenWidth,
    onCustomClickAway,
    customStyles
}) => {
    const [menuDetailActive, setMenuDetailActive] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const size = useWindowSize();
    const mobileMenuScreenWidthLimit = mobileMenuScreenWidth || 1100;

    const handleMenuItemClick = () => {
        if (smallMenu) {
            if (setSmallMenu) setSmallMenu(false);
            if (onSideMenuStateChange) onSideMenuStateChange();
        }
        setMenuDetailActive(!menuDetailActive);
        setSearchInput("");
    };

    function MenuItemDesktop() {
        return (
            <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                onClick={handleMenuItemClick}
                id="menuitem"
            >
                <Box display="flex" alignItems="center">
                    {item.icon && (
                        <Box display="flex" alignItems="center" mr={1}>
                            {item.icon}
                        </Box>
                    )}

                    {!smallMenu && (
                        <Typography
                            sx={{
                                ...styles.menuItemTextStyle(menuDetailActive)
                            }}
                            data-testid="item-label"
                        >
                            {item.label}
                        </Typography>
                    )}
                </Box>
                {item.children && !smallMenu && (
                    <Box
                        mr={6}
                        sx={{
                            "&:hover svg path": {
                                fill: `${
                                    size.width > mobileMenuScreenWidthLimit ? "black" : "#D5FBFF"
                                }`
                            },
                            color: "#FFF"
                        }}
                        display="flex"
                    >
                        <svg
                            width="22"
                            height="24"
                            viewBox="0 0 22 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                transform: `${
                                    size.width < mobileMenuScreenWidthLimit
                                        ? menuDetailActive
                                            ? "rotate(270deg)"
                                            : "rotate(90deg)"
                                        : "rotate(0deg)"
                                }`
                            }}
                        >
                            <g id="Icon">
                                <path
                                    id="&#244;&#128;&#134;&#138;"
                                    d="M15.0104 12.0645C15.0104 11.832 14.929 11.6338 14.766 11.4561L9.87834 6.24023C9.74048 6.08984 9.57129 6.01465 9.37077 6.01465C8.96347 6.01465 8.63762 6.35645 8.63762 6.80078C8.63762 7.01953 8.71908 7.21777 8.85694 7.375L13.2684 12.0645L8.85694 16.7539C8.72535 16.9043 8.63762 17.1025 8.63762 17.3213C8.63762 17.7725 8.96347 18.1143 9.37077 18.1143C9.57129 18.1143 9.74048 18.0391 9.87834 17.8887L14.766 12.6729C14.9352 12.4951 15.0104 12.2969 15.0104 12.0645Z"
                                />
                            </g>
                        </svg>
                    </Box>
                )}
            </Box>
        );
    }

    function MenuItemMobile() {
        return (
            <React.Fragment>
                {item.children && menuDetailActive && size.width < mobileMenuScreenWidthLimit && (
                    <Box display="flex" flexDirection="column" ml={4}>
                        {item.children?.map((child) => (
                            <Box
                                key={child.id}
                                onClick={(e) => {
                                    onItemClick(child);
                                    setMenuDetailActive(false);
                                    e.stopPropagation();
                                }}
                            >
                                <Typography
                                    sx={{
                                        ...styles.mobileSubMenuItem,
                                        ...customStyles?.mobileSubMenuItem
                                    }}
                                >
                                    {child.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </React.Fragment>
        );
    }

    const menuItem = (
        <Box
            key={key}
            id="menu"
            className={`menuItem`}
            sx={() => ({
                ...styles.MenuItemStyle(smallMenu, mobileMenuScreenWidthLimit, menuDetailActive)
            })}
            onClick={() => {
                if (favouriteLinks) Object.assign(item, { favouriteLinks: favouriteLinks });

                onItemClick(item);
            }}
        >
            <MenuItemDesktop />

            {item.children &&
                menuDetailActive &&
                size.width > mobileMenuScreenWidthLimit &&
                !smallMenu && (
                    <Box
                        sx={{
                            ...styles.menuDetailActiveStyle,
                            marginLeft:
                                customStyles?.sideMenuContainer?.width !== undefined
                                    ? `${
                                          Number(
                                              customStyles?.sideMenuContainer?.width.slice(0, -2)
                                          ) - 51
                                      }px`
                                    : "299.1px"
                        }}
                    >
                        <Box display="flex" id="detail">
                            <Box width="100%">
                                <Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="flex-start"
                                        margin="1rem 2rem 0 2rem"
                                        gap="5.5rem"
                                    >
                                        <Typography
                                            sx={{
                                                ...styles.menuDetailActiveHeaderStyle
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                        {menuSearch && (
                                            <FormControl
                                                sx={styles.textFieldFormControlStyleDetail}
                                            >
                                                <TextField
                                                    autoComplete="off"
                                                    id="sideMenuSearchbar"
                                                    name="sideMenuSearchbar"
                                                    key="sideMenuSearchbar"
                                                    labeltext=""
                                                    placeholder={megaMenuSearchPlaceholder || "ara"}
                                                    sx={styles.searchInputDetailStyle}
                                                    onChange={(e) => {
                                                        setSearchInput(e.target.value);
                                                        if (onMegaMenuSearchChange)
                                                            onMegaMenuSearchChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                        )}
                                    </Box>
                                </Box>

                                <Box
                                    display="grid"
                                    gridTemplateColumns="1fr 1fr 1fr"
                                    gap="1rem"
                                    margin="2rem 1rem 0 2rem"
                                >
                                    {item.children
                                        ?.filter((child) => {
                                            return child.label
                                                .toLowerCase()
                                                .includes(searchInput.toLowerCase());
                                        })
                                        ?.map((child) => (
                                            <Box
                                                key={child.id}
                                                onClick={(e) => {
                                                    onItemClick(child);
                                                    setMenuDetailActive(false);
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        ...styles.subMenuItem
                                                    }}
                                                >
                                                    {child.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                </Box>
                            </Box>
                            {size.width > 1300 && favouriteLinks && favouriteLinks.length > 0 && (
                                <Box
                                    sx={{
                                        ...styles.favouriteLinksContainerStyle
                                    }}
                                    data-testid="favorite-links"
                                >
                                    <Typography
                                        sx={{
                                            ...styles.favouriteLinksHeaderStyle
                                        }}
                                    >
                                        {favouriteLinksTitle || "Sık Kullanılan İşlemler"}
                                    </Typography>
                                    <Box
                                        sx={{
                                            ...styles.favouriteLinksListStyle
                                        }}
                                    >
                                        {favouriteLinks.map((link) => (
                                            <Typography
                                                key={link.id}
                                                sx={{
                                                    ...styles.favouriteLinkItemStyle
                                                }}
                                                onClick={(e) => {
                                                    onItemClick(link);
                                                    setMenuDetailActive(false);
                                                    e.stopPropagation();
                                                }}
                                            >
                                                {link.label}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}

            {MenuItemMobile()}
        </Box>
    );

    return menuDetailActive ? (
        <ClickAwayListener
            onClickAway={(e: any) => {
                if (size.width > mobileMenuScreenWidthLimit) setMenuDetailActive(false);
                else setTimeout(() => setMenuDetailActive(false), 1);
                // mobil görünümde bir mega menu açıkken başka bir menu item tıklanınca, önce clickaway
                // çalıştığından, ilk önce ilk mega menu kapanıyor. Dolayısıyla, ilk mega menunün kapanması diğer itemların konumunu etkilediğinden, tıklanmak istenen
                // menu item tıklanamıyor. Bu yüzden önce tıklanmak istenen menu itema tıklanması için clickaway'in daha sonra çalışması sağlandı.
                setSearchInput("");
                if (onCustomClickAway && e.target?.id === "gibSideMenu")
                    // sideMenu componentinin dışına tıklanma durumu. İçerde bir item'a tıklanırsa çalışmaz.
                    onCustomClickAway();
            }}
        >
            {menuItem}
        </ClickAwayListener>
    ) : (
        <Box> {menuItem}</Box>
    );
};

const SideMenu = ({
    menuItems,
    onItemClick,
    favouriteLinks,
    favouriteLinksTitle,
    menuSearch,
    onAction,
    showActionButton,
    actionButtonLabel,
    logo,
    closeIcon,
    closeIconOnClick,
    customStyles,
    isSmallMenu,
    megaMenuSearchPlaceholder,
    sideMenuSearchPlaceholder,
    onMegaMenuSearchChange,
    onSideMenuSearchChange,
    onSideMenuStateChange,
    smallMenuButtonOnClick,
    mobileMenuScreenWidthPx,
    onCustomClickAway
}: SideMenuProps) => {
    const menuLineIndex = Math.floor((menuItems.length * 66) / 100);
    const [searchKey, setSearchKey] = useState("");
    const [smallMenu, setSmallMenu] = useState(isSmallMenu || false);
    const size = useWindowSize();

    const mobileMenuScreenWidth = mobileMenuScreenWidthPx || 1100;

    useEffect(() => {
        if (isSmallMenu !== undefined) {
            setSmallMenu(isSmallMenu);
        }
    }, [isSmallMenu]);

    return (
        <Box display="flex" id="gibSideMenu">
            <Box
                sx={() => {
                    const containerStyles = {
                        ...styles.sideMenuContainer(
                            smallMenu,
                            customStyles?.sideMenuContainer?.width
                        )
                    };

                    if (customStyles?.sideMenuContainer?.width !== undefined) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { width, ...restStyles } = customStyles?.sideMenuContainer;
                        return {
                            ...containerStyles,
                            ...restStyles
                        };
                    }
                    return { ...containerStyles, ...customStyles?.sideMenuContainer };
                }}
            >
                {(logo || closeIcon) && !smallMenu && size.width < mobileMenuScreenWidth && (
                    <Grid
                        item
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        maxWidth="350px"
                        height="70px"
                        p="2rem"
                        pl="30px"
                    >
                        <Box ml={1}>{logo && logo}</Box>
                        <Box fontSize="20px" sx={{ cursor: "pointer" }} onClick={closeIconOnClick}>
                            {closeIcon && <>&#10006;</>}
                        </Box>
                    </Grid>
                )}

                {menuSearch && (
                    <FormControl
                        sx={{
                            ...styles.textFieldFormControlStyle(
                                smallMenu,
                                customStyles?.textFieldFormControlStyle?.width
                            )
                        }}
                    >
                        <TextField
                            autoComplete="off"
                            endicon={
                                <Icons.SearchOutlined
                                    sx={{
                                        color: "#FFF"
                                    }}
                                />
                            }
                            id="menuSearch"
                            labeltext=""
                            placeholder={sideMenuSearchPlaceholder || "ara"}
                            sx={{
                                ...styles.searchInputStyle,
                                "& fieldset": {
                                    border: "none !important"
                                }
                            }}
                            onChange={(e) => {
                                setSearchKey(e.target.value);
                                if (onSideMenuSearchChange) onSideMenuSearchChange(e);
                            }}
                        />
                    </FormControl>
                )}

                {menuItems
                    .filter(
                        (item) =>
                            item.label.toLowerCase().includes(searchKey.toLocaleLowerCase()) &&
                            (!smallMenu || item.icon)
                    )
                    .map((item, index) => (
                        <>
                            <MenuItemComponent
                                key={item.id}
                                item={item}
                                customStyles={customStyles}
                                onItemClick={onItemClick}
                                favouriteLinks={favouriteLinks}
                                favouriteLinksTitle={favouriteLinksTitle}
                                smallMenu={smallMenu}
                                setSmallMenu={setSmallMenu}
                                menuSearch={menuSearch}
                                onMegaMenuSearchChange={onMegaMenuSearchChange}
                                onSideMenuStateChange={onSideMenuStateChange}
                                mobileMenuScreenWidth={mobileMenuScreenWidth}
                                megaMenuSearchPlaceholder={megaMenuSearchPlaceholder}
                                onCustomClickAway={onCustomClickAway}
                            />
                            {index === menuLineIndex && (
                                <Box
                                    sx={{
                                        ...styles.menuLineStyle
                                    }}
                                />
                            )}
                        </>
                    ))}
                {showActionButton && (
                    <Box
                        onClick={() => onAction && onAction()}
                        sx={{
                            cursor: "pointer",
                            ...customStyles?.actionButtonStyles
                        }}
                    >
                        <Typography>{actionButtonLabel}</Typography>
                    </Box>
                )}
            </Box>
            {size.width > mobileMenuScreenWidth && (
                <Box
                    onClick={() => {
                        setSmallMenu(!smallMenu);
                        if (onSideMenuStateChange) onSideMenuStateChange();
                        if (smallMenuButtonOnClick) smallMenuButtonOnClick();
                    }}
                    maxHeight="3rem"
                    sx={{
                        background:
                            customStyles?.sideMenuContainer?.background ||
                            customStyles?.sideMenuContainer?.backgroundColor ||
                            "rgb(17, 115, 133)",
                        backgroundColor:
                            customStyles?.sideMenuContainer?.background || "rgb(17, 115, 133)",
                        cursor: "pointer"
                    }}
                >
                    <svg
                        width="22"
                        height="48"
                        viewBox="0 0 22 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#FFF"
                        style={{
                            transform: `${smallMenu ? "rotate(360deg)" : "rotate(180deg)"}`
                        }}
                    >
                        <g id="Icon">
                            <path
                                id="&#244;&#128;&#134;&#138;"
                                d="M15.0104 12.0645C15.0104 11.832 14.929 11.6338 14.766 11.4561L9.87834 6.24023C9.74048 6.08984 9.57129 6.01465 9.37077 6.01465C8.96347 6.01465 8.63762 6.35645 8.63762 6.80078C8.63762 7.01953 8.71908 7.21777 8.85694 7.375L13.2684 12.0645L8.85694 16.7539C8.72535 16.9043 8.63762 17.1025 8.63762 17.3213C8.63762 17.7725 8.96347 18.1143 9.37077 18.1143C9.57129 18.1143 9.74048 18.0391 9.87834 17.8887L14.766 12.6729C14.9352 12.4951 15.0104 12.2969 15.0104 12.0645Z"
                            />
                        </g>
                    </svg>
                </Box>
            )}
        </Box>
    );
};

export default SideMenu;
