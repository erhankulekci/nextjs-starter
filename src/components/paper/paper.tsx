"use client";
import React from "react";
import { Paper as SphinxPaper, PaperProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Paper = ({ sx, ...props }: PaperProps) => {
    const styles = useAppSelector(customization);
    return (
        <SphinxPaper sx={{ borderRadius: styles.borderRadius, ...sx }} {...props}>
            {props.children}
        </SphinxPaper>
    );
};

export default Paper;
