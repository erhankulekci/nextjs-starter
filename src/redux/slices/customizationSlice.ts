import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
    setFooterColor,
    setHeaderColor,
    setSidebarColor,
    setThemeColors
} from "@/utils/setThemeColors";
import { blueThemeColors } from "@/assets/colors/themeColors";

const config: Record<string, any> = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: "/free",
    defaultPath: "/dashboard/default",
    hasSidebar: true,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: "10px",
    fontSize: "14px",
    ...blueThemeColors
};

export interface CustomizationState {
    defaultId: string;
    fontFamily: string;
    fontSize: string;
    hasSidebar: boolean;
    borderRadius: string;
    themeName: string;
    headerBgColor: string;
    footerBgColor: string;
    sidebarBgColor: string;
    borderColor: string;
    primaryColor: string;
    primaryLightColor: string;
    primaryDarkColor: string;
    secondaryColor: string;
    secondaryLightColor: string;
    secondaryDarkColor: string;
}

export const initialState: CustomizationState = {
    defaultId: "default",
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    hasSidebar: config.hasSidebar,
    borderRadius: config.borderRadius,
    themeName: config.themeName,
    headerBgColor: config.header,
    footerBgColor: config.footer,
    sidebarBgColor: config.sidebar,
    borderColor: config.primary,
    primaryColor: config.primary,
    primaryLightColor: config.primaryLight,
    primaryDarkColor: config.primaryDark,
    secondaryColor: config.secondary,
    secondaryLightColor: config.secondaryLight,
    secondaryDarkColor: config.secondaryDark
};

export const customizationSlice = createSlice({
    name: "customization",
    initialState,
    reducers: {
        resetStyles: () => ({ ...initialState }),
        setBorderRadius: (state, action: PayloadAction<string>) => {
            state.borderRadius = action.payload;
        },
        setHasSidebar: (state, action: PayloadAction<boolean>) => {
            state.hasSidebar = action.payload;
        },
        setFontFamily: (state, action: PayloadAction<string>) => {
            state.fontFamily = action.payload;
        },
        setHeaderBgColor: (state, action: PayloadAction<string>) => {
            setHeaderColor(state, action.payload);
        },
        setFooterBgColor: (state, action: PayloadAction<string>) => {
            setFooterColor(state, action.payload);
        },
        setSidebarBgColor: (state, action: PayloadAction<string>) => {
            setSidebarColor(state, action.payload);
        },
        setBorderColor: (state, action: PayloadAction<string>) => {
            state.sidebarBgColor = action.payload;
        },
        setThemeColor: (state, action: PayloadAction<string>) => {
            setThemeColors(state, action.payload);
        },
        setFontSize: (state, action: PayloadAction<string>) => {
            state.fontSize = action.payload;
        }
    }
});

export const {
    resetStyles,
    setFontFamily,
    setBorderRadius,
    setHasSidebar,
    setHeaderBgColor,
    setFooterBgColor,
    setSidebarBgColor,
    setBorderColor,
    setThemeColor,
    setFontSize
} = customizationSlice.actions;

export const customization = (state: RootState) => state.customization;

export default customizationSlice.reducer;
