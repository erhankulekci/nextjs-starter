"use client";
import React from "react";
import { Button as GibButton, ButtonProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Button = ({ sx, ...props }: ButtonProps) => {
    const styles = useAppSelector(customization);

    const getGeneralButtonFontSize = (fontSizeStr: string) => {
        const fontSizeNum = Number(fontSizeStr.replace("px", ""));
        const newFontSizeNum = Math.ceil(fontSizeNum * 0.85);
        const newFontSizeStr = newFontSizeNum + "px";
        return newFontSizeStr;
    };

    let bgColor = styles.primaryColor;
    let borderColor = styles.borderColor;
    let fontSize = styles.fontSize;
    let textColor = "#FFF";

    switch (props.buttontype) {
        case "primary":
            bgColor = styles.primaryDarkColor;
            borderColor = styles.primaryDarkColor;
            fontSize = styles.fontSize;
            break;
        case "secondary":
            bgColor = "#FFF";
            borderColor = styles.primaryColor;
            textColor = styles.primaryColor;
            fontSize = styles.fontSize;
            break;
        case "general":
            bgColor = styles.primaryColor;
            borderColor = styles.primaryColor;
            fontSize = getGeneralButtonFontSize(styles.fontSize);
            break;
        case "generalSecondary":
            bgColor = styles.secondaryColor;
            borderColor = styles.secondaryColor;
            fontSize = getGeneralButtonFontSize(styles.fontSize);
            break;
    }

    return (
        <GibButton
            sx={{
                borderRadius: styles.borderRadius,
                backgroundColor: bgColor,
                borderColor: borderColor,
                color: textColor,
                fontSize: fontSize,
                "&:hover": { backgroundColor: bgColor },

                ...sx
            }}
            {...props}
        >
            {props.children}
        </GibButton>
    );
};

export default Button;
