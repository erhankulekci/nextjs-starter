"use client";
import React from "react";
import { GibStepper, GibStepperProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Stepper = ({ color, activeStepBgColor, ...rest }: GibStepperProps) => {
    const styles = useAppSelector(customization);
    return (
        <GibStepper
            color={color || styles.primaryColor}
            activeStepBgColor={activeStepBgColor}
            {...rest}
        />
    );
};

export default Stepper;
