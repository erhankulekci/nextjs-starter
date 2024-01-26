"use client";
import React from "react";
import { Alert as GibAlert, AlertProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Alert = ({ sx, ...props }: AlertProps) => {
    const styles = useAppSelector(customization);
    return (
        <GibAlert
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
        </GibAlert>
    );
};

export default Alert;
