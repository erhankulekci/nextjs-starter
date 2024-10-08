"use client";
import React from "react";
import { RadioGroup as SphinxRadioGroup, RadioGroupProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const RadioGroup = (props: RadioGroupProps) => {
    const styles = useAppSelector(customization);
    return (
        <SphinxRadioGroup
            checkedColor={styles.primaryColor}
            labelFocusedColor={styles.primaryColor}
            labelSx={{ fontSize: styles.fontSize }}
            sx={{ "& .MuiFormControlLabel-label": { fontSize: styles.fontSize } }}
            {...props}
        />
    );
};

export default RadioGroup;
