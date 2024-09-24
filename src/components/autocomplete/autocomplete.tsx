"use client";
import React from "react";
import {
    Autocomplete as SphinxAutoComplete,
    AutocompleteProps as SphinxAutoCompleteProps
} from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { Controller, useFormContext } from "react-hook-form";

interface AutocompleteProps extends SphinxAutoCompleteProps {
    onChange?: (event: React.SyntheticEvent, value: any, reason?: any, details?: any) => void;
}

const Autocomplete = (props: AutocompleteProps) => {
    const { control } = useFormContext();
    const styles: any = useAppSelector(customization);
    return (
        <Controller
            defaultValue={props.defaultValue}
            name={props.id}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <SphinxAutoComplete
                        borderRadius={styles.borderRadius}
                        labelFocusedColor={styles.primaryColor}
                        labelSx={{ fontSize: styles.fontSize }}
                        inputBaseSx={{ fontSize: styles.fontSize }}
                        sx={{
                            "& .MuiAutocomplete-input": {
                                fontSize: styles.fontSize
                            },
                            "& .MuiOutlinedInput-root": {
                                borderColor: fieldState.error ? "#d32f2f" : styles.borderColor,
                                borderWidth: 1,
                                borderStyle: "solid"
                            },
                            ...props.sx
                        }}
                        error={fieldState.invalid}
                        helperText={
                            props.helperText
                                ? props.helperText
                                : fieldState.invalid
                                  ? fieldState.error?.message
                                  : ""
                        }
                        value={field.value}
                        {...props}
                        onCustomChange={(event, newValue, reason, details) => {
                            if (newValue === null) {
                                field.onChange("");
                                return;
                            }
                            if (newValue !== null) {
                                if (props.onCustomChange) {
                                    props.onCustomChange(event, newValue, reason, details);
                                }
                                field.onChange(newValue?.text || newValue);
                            }
                        }}
                    />
                );
            }}
        />
    );
};

export default Autocomplete;
