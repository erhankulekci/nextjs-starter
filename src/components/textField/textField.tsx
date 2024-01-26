"use client";
import React from "react";
import { TextField as GibTextField, TextFieldProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const TextField = (props: TextFieldProps) => {
    const styles = useAppSelector(customization);
    return (
        <GibTextField
            labelFocusedColor={styles.primaryColor}
            labelSx={{ fontSize: styles.fontSize }}
            sx={{ "& .MuiInputBase-input": { fontSize: styles.fontSize } }}
            borderRadius={styles.borderRadius}
            {...props}
        >
            {props.children}
        </GibTextField>
    );
};

export default TextField;
