import { CustomizationState } from "@/redux/slices/customizationSlice";
import {
    blueThemeColors,
    goldenThemeColors,
    greenThemeColors,
    orangeThemeColors,
    purpleThemeColors,
    redThemeColors,
    sphinxThemeColors
} from "@/assets/colors/themeColors";

let themeColors = {
    ...blueThemeColors
};
export const setThemeColors = (state: CustomizationState, color: string) => {
    // "sphinx" | "blue" | "red" | "yellow" | "green" | "purple" | "orange"

    switch (color) {
        case "sphinx":
            themeColors = { ...sphinxThemeColors };
            break;
        case "blue":
            themeColors = { ...blueThemeColors };
            break;
        case "red":
            themeColors = { ...redThemeColors };
            break;
        case "yellow":
            themeColors = { ...goldenThemeColors };
            break;
        case "green":
            themeColors = { ...greenThemeColors };
            break;
        case "purple":
            themeColors = { ...purpleThemeColors };
            break;
        case "orange":
            themeColors = { ...orangeThemeColors };
            break;
        default:
            themeColors = { ...blueThemeColors };
    }
    state.themeName = themeColors.themeName;
    state.headerBgColor = themeColors.header;
    state.footerBgColor = themeColors.footer;
    state.sidebarBgColor = themeColors.sidebar;
    state.borderColor = themeColors.primary;
    state.primaryColor = themeColors.primary;
    state.primaryDarkColor = themeColors.primaryDark;
    state.primaryLightColor = themeColors.primaryLight;
    state.secondaryColor = themeColors.secondary;
    state.secondaryLightColor = themeColors.secondaryLight;
    state.secondaryDarkColor = themeColors.secondaryDark;
};
export const setHeaderColor = (state: CustomizationState, color: string) => {
    switch (color) {
        case "sphinx":
            state.headerBgColor = sphinxThemeColors.header;
            break;
        case "blue":
            state.headerBgColor = blueThemeColors.header;
            break;
        case "red":
            state.headerBgColor = redThemeColors.header;
            break;
        case "yellow":
            state.headerBgColor = goldenThemeColors.header;
            break;
        case "green":
            state.headerBgColor = greenThemeColors.header;
            break;
        case "purple":
            state.headerBgColor = purpleThemeColors.header;
            break;
        case "orange":
            state.headerBgColor = orangeThemeColors.header;
            break;
        default:
            state.headerBgColor = blueThemeColors.header;
    }
};

export const setFooterColor = (state: CustomizationState, color: string) => {
    switch (color) {
        case "sphinx":
            state.footerBgColor = sphinxThemeColors.footer;
            break;
        case "blue":
            state.footerBgColor = blueThemeColors.footer;
            break;
        case "red":
            state.footerBgColor = redThemeColors.footer;
            break;
        case "yellow":
            state.footerBgColor = goldenThemeColors.footer;
            break;
        case "green":
            state.footerBgColor = greenThemeColors.footer;
            break;
        case "purple":
            state.footerBgColor = purpleThemeColors.footer;
            break;
        case "orange":
            state.footerBgColor = orangeThemeColors.footer;
            break;
        default:
            state.footerBgColor = blueThemeColors.footer;
    }
};

export const setSidebarColor = (state: CustomizationState, color: string) => {
    switch (color) {
        case "sphinx":
            state.sidebarBgColor = sphinxThemeColors.sidebar;
            break;
        case "blue":
            state.sidebarBgColor = blueThemeColors.sidebar;
            break;
        case "red":
            state.sidebarBgColor = redThemeColors.sidebar;
            break;
        case "yellow":
            state.sidebarBgColor = goldenThemeColors.sidebar;
            break;
        case "green":
            state.sidebarBgColor = greenThemeColors.sidebar;
            break;
        case "purple":
            state.sidebarBgColor = purpleThemeColors.sidebar;
            break;
        case "orange":
            state.sidebarBgColor = orangeThemeColors.sidebar;
            break;
        default:
            state.sidebarBgColor = blueThemeColors.sidebar;
    }
};
