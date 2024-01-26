"use client";
import { Button, Slider } from "@/components";
import RadioGroup from "@/components/radioGroup";
import { getTranslate } from "@/lib";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    CustomizationState,
    customization,
    resetStyles,
    setBorderRadius,
    setFontSize,
    setFooterBgColor,
    setHasSidebar,
    setHeaderBgColor,
    setSidebarBgColor,
    setThemeColor
} from "@/redux/slices/customizationSlice";

import { Locale } from "@/root/i18n.config";
import { Box, Drawer, Typography } from "@gib-ui/core";
import { Icons } from "@gib-ui/icons";
import React, { useEffect, useState } from "react";
import {
    getCurrentFooterColorName,
    getCurrentHeaderColorName,
    getCurrentSidebarColorName
} from "@/utils/getCurrentColorNames";

export type ThemeColorOptions = "gib" | "blue" | "red" | "yellow" | "green" | "orange" | "purple";

export type ColorButtons = {
    id: any;
    value: ThemeColorOptions;
    label: any;
}[];

const CustomizationDrawer = ({
    isOpen,
    setIsOpen,
    customizationStyles,
    lang
}: {
    isOpen: boolean;
    setIsOpen: (e: boolean) => void;
    customizationStyles: CustomizationState;
    lang: Locale;
}) => {
    const dispatch = useAppDispatch();
    const styles = useAppSelector(customization);
    const [selectedHeaderBgColor, setSelectedHeaderBgColor] = useState<string>("blue");
    const [selectedFooterBgColor, setSelectedFooterBgColor] = useState<string>("blue");
    const [selectedSidebarBgColor, setSelectedSidebarBgColor] = useState<string>("blue");
    const [selectedThemeColor, setSelectedThemeColor] = useState<string>("blue");
    const [selectedBorderRadius, setSelectedBorderRadius] = useState<number | number[]>(10);
    const [selectedFontSize, setSelectedFontSize] = useState<number | number[]>(14);
    const [sidebarState, setSidebarState] = useState<string>("on");
    const { header } = getTranslate(lang);

    useEffect(() => {
        const borderRadiusRedux = Number(styles.borderRadius.replace("px", ""));
        setSelectedBorderRadius(borderRadiusRedux);

        const fontSizeRedux = Number(styles.fontSize.replace("px", ""));
        setSelectedFontSize(fontSizeRedux);

        const sidebarStateRedux = styles.hasSidebar ? "on" : "off";
        setSidebarState(sidebarStateRedux);

        setSelectedThemeColor(styles.themeName);

        const headerColorName = getCurrentHeaderColorName(styles.headerBgColor);
        setSelectedHeaderBgColor(headerColorName);

        const sidebarColorName = getCurrentSidebarColorName(styles.sidebarBgColor);
        setSelectedSidebarBgColor(sidebarColorName);

        const footerColorName = getCurrentFooterColorName(styles.footerBgColor);
        setSelectedFooterBgColor(footerColorName);
    }, []);

    const colors = Object.keys(header.customization.colors) as ThemeColorOptions[];
    const colorButtons: ColorButtons = colors.map((color: ThemeColorOptions) => {
        return {
            id: color,
            value: color,
            label: header.customization.colors[color]
        };
    });

    return (
        <Drawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            width="400px"
            showDvdHeader={false}
            disableScrollLock
            isTransparentBackdrop
            drawerContent={
                <Box>
                    <Box
                        sx={{
                            background: customizationStyles.headerBgColor,
                            color: "#FFF",
                            paddingX: "24px",
                            height: "69px",
                            display: "flex",
                            alignItems: "center",
                            position: "sticky",
                            top: "0",
                            zIndex: 10
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%"
                            }}
                        >
                            <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
                                {header.customization.title}
                            </Typography>
                            <Icons.Close
                                onClick={() => setIsOpen(false)}
                                sx={{ cursor: "pointer" }}
                                fontSize="large"
                            ></Icons.Close>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            padding: "24px",
                            gap: "12px",
                            display: "grid"
                        }}
                    >
                        <Button
                            onClick={() => {
                                dispatch(resetStyles());
                                setSelectedFooterBgColor("blue");
                                setSelectedHeaderBgColor("blue");
                                setSelectedSidebarBgColor("blue");
                                setSelectedThemeColor("blue");
                                setSelectedBorderRadius(10);
                                setSelectedFontSize(14);
                                setSidebarState("on");
                            }}
                            buttontype="primary"
                            sx={{ placeSelf: "center", width: "75%", mb: 1 }}
                        >
                            {header.customization.resetButtonText}
                        </Button>
                        <Typography
                            sx={{ fontSize: "14px", fontWeight: 600, color: "rgb(37, 37, 37)" }}
                        >
                            Font Size (px)
                        </Typography>
                        <Slider
                            step={1}
                            marks
                            min={8}
                            max={30}
                            valueLabelDisplay="auto"
                            defaultValue={14}
                            value={selectedFontSize}
                            onChange={(_: any, newValue: number | number[]) => {
                                dispatch(setFontSize(`${newValue}px`));
                                setSelectedFontSize(newValue);
                            }}
                        />
                        <Typography
                            sx={{ fontSize: "14px", fontWeight: 600, color: "rgb(37, 37, 37)" }}
                        >
                            Border Radius (px)
                        </Typography>
                        <Slider
                            step={1}
                            marks
                            min={0}
                            max={30}
                            valueLabelDisplay="auto"
                            defaultValue={10}
                            value={selectedBorderRadius}
                            onChange={(_: any, newValue: number | number[]) => {
                                dispatch(setBorderRadius(`${newValue}px`));
                                setSelectedBorderRadius(newValue);
                            }}
                        />

                        <RadioGroup
                            labeltext="Sidebar"
                            id="sidebarOnOff"
                            onChange={(_, option) => {
                                if (option === "on") {
                                    dispatch(setHasSidebar(true));
                                    setSidebarState("on");
                                } else {
                                    dispatch(setHasSidebar(false));
                                    setSidebarState("off");
                                }
                            }}
                            buttons={[
                                {
                                    id: "sidebarOn",
                                    value: "on",
                                    label: header.customization.sidebar.on
                                },
                                {
                                    id: "sidebarOff",
                                    value: "off",
                                    label: header.customization.sidebar.off
                                }
                            ]}
                            optionsGap="0px"
                            value={sidebarState}
                        />
                        <RadioGroup
                            labeltext="Theme Color"
                            id="themeColor"
                            onChange={(_, selectedColor) => {
                                dispatch(setThemeColor(selectedColor));
                                setSelectedFooterBgColor(selectedColor);
                                setSelectedHeaderBgColor(selectedColor);
                                setSelectedSidebarBgColor(selectedColor);
                                setSelectedThemeColor(selectedColor);
                            }}
                            defaultValue={selectedThemeColor}
                            value={selectedThemeColor}
                            optionsGap="0px"
                            isGridLayout
                            buttons={colorButtons}
                        />
                        <RadioGroup
                            labeltext="Header Background Color"
                            id="headerColor"
                            onChange={(_, selectedColor) => {
                                dispatch(setHeaderBgColor(selectedColor));
                                setSelectedHeaderBgColor(selectedColor);
                            }}
                            buttons={colorButtons}
                            optionsGap="0px"
                            value={selectedHeaderBgColor}
                            isGridLayout
                        />
                        <RadioGroup
                            labeltext="Footer Background Color"
                            id="footerColor"
                            onChange={(_, selectedColor) => {
                                dispatch(setFooterBgColor(selectedColor));
                                setSelectedFooterBgColor(selectedColor);
                            }}
                            value={selectedFooterBgColor}
                            optionsGap="0px"
                            buttons={colorButtons}
                            isGridLayout
                        />
                        <RadioGroup
                            labeltext="Sidebar Background Color"
                            id="sidenavColor"
                            onChange={(_, selectedColor) => {
                                dispatch(setSidebarBgColor(selectedColor));
                                setSelectedSidebarBgColor(selectedColor);
                            }}
                            value={selectedSidebarBgColor}
                            optionsGap="0px"
                            buttons={colorButtons}
                            isGridLayout
                        />
                    </Box>
                </Box>
            }
        />
    );
};

export default CustomizationDrawer;
