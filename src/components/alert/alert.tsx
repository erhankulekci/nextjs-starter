"use client";
import React from "react";
import { Alert as SphinxAlert, AlertProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Alert = ({ sx, ...props }: AlertProps) => {
    const styles = useAppSelector(customization);
    return (
        <SphinxAlert
            sx={{
                borderRadius: styles.borderRadius,
                borderColor: styles.borderColor,
                boxShadow: "0px 2px 3px 0px #00000029",
                backgroundColor: styles.primaryLightColor,
                "& .MuiTypography-body1": { fontSize: styles.fontSize },

                ...sx
            }}
            {...props}
        >
            {props.children}
        </SphinxAlert>
    );
};

export default Alert;
