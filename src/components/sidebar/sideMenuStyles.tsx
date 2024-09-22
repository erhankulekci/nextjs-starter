import { useWindowSize } from "@/hooks";

const sideMenuContainer = (smallMenu: boolean, width: any) => {
    let dynamicWidth = "";
    if (width === undefined) {
        dynamicWidth = smallMenu ? "96px" : "350px";
    } else {
        dynamicWidth = smallMenu ? "96px" : width;
    }
    return {
        background: "linear-gradient(180deg, #107586 0%, #1A5770 18.02%, #350435 85.21%)",
        color: "white",
        flexShrink: 0,
        width: `${dynamicWidth} !important`,
        minHeight: "100vh",
        paddingTop: "1rem",
        transition: "width 0.2s ease-in-out"
    };
};

const MenuItemStyle = (
    smallMenu: boolean,
    mobileMenuScreenWidth: number,
    menuDetailActive: boolean = false,
    menuItemActiveStyle: React.CSSProperties = {}
) => {
    const smallMenuScreenWidth = mobileMenuScreenWidth || 1100;
    const { width } = useWindowSize();

    const hoverOrSelectedStyles = {
        background: width > smallMenuScreenWidth ? "#F8F8F8" : undefined,
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        color: width > smallMenuScreenWidth ? "#1A5570" : undefined,
        ...menuItemActiveStyle
    };

    const activeMenuItemStyles = menuDetailActive ? { ...hoverOrSelectedStyles } : {};
    return {
        marginLeft: smallMenu ? "20px" : "31px",
        display: "flex",
        paddingLeft: "1.25rem",
        alignItems: width > smallMenuScreenWidth ? "center" : "flex-start",
        flexDirection: width < smallMenuScreenWidth ? "column" : "row",
        marginBottom: "13px",
        height: width < smallMenuScreenWidth ? "auto" : "40px",
        cursor: "pointer",
        "&:hover": {
            ...hoverOrSelectedStyles
        },

        "svg path": {
            fill: menuDetailActive ? (width > smallMenuScreenWidth ? "black" : "#D5FBFF") : ""
        },

        "&:hover svg path": {
            fill: width > smallMenuScreenWidth ? "black" : "#D5FBFF"
        },
        ...activeMenuItemStyles
    };
};

const menuItemTextStyle = (menuDetailActive: boolean = false) => {
    return {
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
        textAlign: "start",
        "&:hover": {
            opacity: menuDetailActive ? 1 : 0.7
        }
    };
};

const menuDetailActiveStyle = {
    borderRadius: "0px 15px 15px 0px",
    background: "#F8F8F8",
    maxWidth: "1155px",
    minHeight: "325px",
    position: "absolute",
    marginTop: "17.825rem",
    cursor: "auto",
    // minWidth: "1155px",
    zIndex: 99,
    minWidth: "755px"
};

const menuDetailActiveHeaderStyle = {
    color: " #1A5570",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: " 700",
    lineHeight: "normal"
};

const textFieldFormControlStyle = (smallMenu: boolean, width: string) => {
    return {
        ".MuiInputBase-root": {
            color: "#FFF !important",
            border: "none",
            backgroundColor: "#093640",
            boxShadow: "0rem 0rem 0.375rem rgba(31, 68, 99, 0.61)",
            paddingLeft: "10px !important",
            marginLeft: smallMenu ? undefined : "24px",
            borderRadius: "6px",
            height: "40px",
            marginBottom: "2rem",
            width: smallMenu ? "64px !important" : width
        }
    };
};

const textFieldFormControlStyleDetail = {
    ".MuiInputBase-root": {
        color: "#252525 !important",
        border: "none",
        backgroundColor: "#EAEAEA !important",
        borderRadius: "10px",
        height: "40px",
        minWidth: "inherit",
        maxWidth: "280px",
        padding: "10px 0px 10px 15px"
    }
};

const searchInputStyle = {
    width: "inherit",
    marginLeft: "1rem",
    input: {
        "&::placeholder": {
            color: "#FFF !important",
            opacity: "1 !impoortant"
        }
    }
};

const searchInputDetailStyle = {
    marginLeft: "inherit",
    width: "21rem",
    "& fieldset": {
        display: "none"
    },
    input: {
        "&::placeholder": {
            color: "#252525 !important",
            opacity: "0.7 !impoortant",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400"
        }
    }
};

const favouriteLinksContainerStyle = {
    width: "294px",
    height: "325px",
    flexShrink: 0,
    borderRadius: "0px 10px 10px 0px",
    background: "#1E4866",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const favouriteLinksHeaderStyle = {
    color: "#FFF",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    marginTop: "40px"
};

const favouriteLinksListStyle = {
    mt: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
};

const favouriteLinkItemStyle = {
    color: "#FFF",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    marginRight: "2.5rem",
    marginBottom: "20px",
    cursor: "pointer",
    padding: "0.15rem",
    "&:hover": {
        background: "#FFF",
        color: "#1A5570",
        borderRadius: "5px"
    }
};

const menuLineStyle = {
    height: "2px",
    background:
        "linear-gradient(270deg, rgba(238, 238, 238, 0.00) 0%, #02FDF6 52.86%, rgba(216, 216, 216, 0.00) 101.79%)",

    backdropFilter: "blur(5px)",
    margin: "1rem auto 1rem auto"
};

const subMenuItem = {
    cursor: "pointer",
    color: "#1A5570",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "600",
    padding: "0.15rem",
    "&:hover": {
        background: "#E8EEF2",
        borderRadius: "5px"
    },

    height: "20px"
};

const mobileSubMenuItem = {
    cursor: "pointer",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "600",
    padding: "0.15rem",
    height: "20px",
    "&:hover": {
        background: "#E8EEF2",
        borderRadius: "5px",
        color: "#1A5570"
    }
};

export const sideMenuStyles = {
    sideMenuContainer,
    MenuItemStyle,
    menuItemTextStyle,
    menuDetailActiveStyle,
    menuDetailActiveHeaderStyle,
    textFieldFormControlStyle,
    textFieldFormControlStyleDetail,
    searchInputStyle,
    searchInputDetailStyle,
    favouriteLinksContainerStyle,
    favouriteLinksHeaderStyle,
    favouriteLinksListStyle,
    favouriteLinkItemStyle,
    menuLineStyle,
    subMenuItem,
    mobileSubMenuItem
};
