import {
    sphinxThemeColors,
    blueThemeColors,
    goldenThemeColors,
    greenThemeColors,
    orangeThemeColors,
    purpleThemeColors,
    redThemeColors
} from "@/assets/colors/themeColors";

export const getCurrentHeaderColorName = (currentHeaderColor: string) => {
    let headerColorName = "";
    switch (currentHeaderColor) {
        case blueThemeColors.header:
            headerColorName = blueThemeColors.themeName;
            break;
        case sphinxThemeColors.header:
            headerColorName = sphinxThemeColors.themeName;
            break;
        case redThemeColors.header:
            headerColorName = redThemeColors.themeName;
            break;
        case purpleThemeColors.header:
            headerColorName = purpleThemeColors.themeName;
            break;
        case greenThemeColors.header:
            headerColorName = greenThemeColors.themeName;
            break;
        case goldenThemeColors.header:
            headerColorName = goldenThemeColors.themeName;
            break;
        case orangeThemeColors.header:
            headerColorName = orangeThemeColors.themeName;
            break;
        default:
            headerColorName = blueThemeColors.themeName;
    }
    return headerColorName;
};
export const getCurrentSidebarColorName = (currentSidebarColor: string) => {
    let sidebarColorName = "";
    switch (currentSidebarColor) {
        case blueThemeColors.sidebar:
            sidebarColorName = blueThemeColors.themeName;
            break;
        case sphinxThemeColors.sidebar:
            sidebarColorName = sphinxThemeColors.themeName;
            break;
        case redThemeColors.sidebar:
            sidebarColorName = redThemeColors.themeName;
            break;
        case purpleThemeColors.sidebar:
            sidebarColorName = purpleThemeColors.themeName;
            break;
        case greenThemeColors.sidebar:
            sidebarColorName = greenThemeColors.themeName;
            break;
        case goldenThemeColors.sidebar:
            sidebarColorName = goldenThemeColors.themeName;
            break;
        case orangeThemeColors.sidebar:
            sidebarColorName = orangeThemeColors.themeName;
            break;
        default:
            sidebarColorName = blueThemeColors.themeName;
    }
    return sidebarColorName;
};
export const getCurrentFooterColorName = (currentFooterColor: string) => {
    let footerColorName = "";
    switch (currentFooterColor) {
        case blueThemeColors.footer:
            footerColorName = blueThemeColors.themeName;
            break;
        case sphinxThemeColors.footer:
            footerColorName = sphinxThemeColors.themeName;
            break;
        case redThemeColors.footer:
            footerColorName = redThemeColors.themeName;
            break;
        case purpleThemeColors.footer:
            footerColorName = purpleThemeColors.themeName;
            break;
        case greenThemeColors.footer:
            footerColorName = greenThemeColors.themeName;
            break;
        case goldenThemeColors.footer:
            footerColorName = goldenThemeColors.themeName;
            break;
        case orangeThemeColors.footer:
            footerColorName = orangeThemeColors.themeName;
            break;
        default:
            footerColorName = blueThemeColors.themeName;
    }
    return footerColorName;
};
