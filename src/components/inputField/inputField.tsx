"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const InputField = ({ sx, ...props }: TextFieldProps) => {
    const { control } = useFormContext();
    const styles = useAppSelector(customization);

    return (
        <Controller
            defaultValue={props.defaultValue}
            name={props.name || props.id}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...props}
                    id={props.id || props.name || "textfield"}
                    error={fieldState.invalid}
                    labelSx={{ fontSize: styles.fontSize }}
                    sx={{ "& .MuiInputBase-input": { fontSize: styles.fontSize }, ...sx }}
                    borderRadius={styles.borderRadius}
                    labelFocusedColor={styles.primaryColor}
                    helperText={
                        props.helperText
                            ? props?.helperText
                            : fieldState?.invalid
                              ? fieldState?.error?.message
                              : ""
                    }
                />
            )}
        />
    );
};

export default InputField;
