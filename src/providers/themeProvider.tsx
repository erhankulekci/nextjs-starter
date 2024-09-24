"use client";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ThemeProvider as SphinxThemeProvider } from "@mui/material";
import React from "react";
import themes from "../theme";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const customization = useAppSelector((state: RootState) => state.customization);
    return <SphinxThemeProvider theme={themes(customization)}>{children}</SphinxThemeProvider>;
};
export default ThemeProvider;
