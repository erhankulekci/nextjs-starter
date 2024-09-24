"use client";
import React from "react";
import { TextField as SphinxTextField, TextFieldProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const TextField = (props: TextFieldProps) => {
    const styles = useAppSelector(customization);
    return (
        <SphinxTextField
            labelFocusedColor={styles.primaryColor}
            labelSx={{ fontSize: styles.fontSize }}
            sx={{ "& .MuiInputBase-input": { fontSize: styles.fontSize } }}
            borderRadius={styles.borderRadius}
            {...props}
        >
            {props.children}
        </SphinxTextField>
    );
};

export default TextField;
