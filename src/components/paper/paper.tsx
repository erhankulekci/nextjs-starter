"use client";
import React from "react";
import { Paper as GibPaper, PaperProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Paper = ({ sx, ...props }: PaperProps) => {
    const styles = useAppSelector(customization);
    return (
        <GibPaper sx={{ borderRadius: styles.borderRadius, ...sx }} {...props}>
            {props.children}
        </GibPaper>
    );
};

export default Paper;
