"use client";
import React from "react";
import { Autocomplete as GibAutocomplete, AutocompleteProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { Controller, useFormContext } from "react-hook-form";

const Autocomplete = (props: AutocompleteProps) => {
    const { control } = useFormContext();
    const styles = useAppSelector(customization);
    return (
        <Controller
            defaultValue={props.defaultValue}
            name={props.id}
            control={control}
            render={({ field }) => (
                <GibAutocomplete
                    borderRadius={styles.borderRadius}
                    labelFocusedColor={styles.primaryColor}
                    labelSx={{ fontSize: styles.fontSize }}
                    sx={{ "& .MuiAutocomplete-input": { fontSize: styles.fontSize } }}
                    {...field}
                    {...props}
                />
            )}
        />
    );
};

export default Autocomplete;
