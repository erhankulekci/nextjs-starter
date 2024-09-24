"use client";
import React from "react";
import { Tabs as SphinxTabs, TabItemsProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Tabs = ({ selectedTabSx, tabIndicatorSx, ...props }: TabItemsProps) => {
    const styles = useAppSelector(customization);
    return (
        <SphinxTabs
            selectedTabSx={{
                backgroundColor: styles.primaryLightColor,
                opacity: "0.5",
                color: "#FFF",
                ...selectedTabSx
            }}
            tabIndicatorSx={{
                backgroundColor: styles.primaryColor,
                ...tabIndicatorSx
            }}
            {...props}
        />
    );
};

export default Tabs;
