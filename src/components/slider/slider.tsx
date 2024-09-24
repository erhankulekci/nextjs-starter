"use client";
import React from "react";
import { Slider as SphinxSlider, SliderProps } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Slider = ({ sx, ...props }: SliderProps) => {
    const styles = useAppSelector(customization);
    return <SphinxSlider sx={{ color: styles.primaryColor, ...sx }} {...props} />;
};

export default Slider;
