"use client";
import React from "react";
import { FileUpload as GibFileUpload, FileUploadProps } from "@gib-ui/core";
import { Button } from "@/components";

const FileUpload = ({ formButton, buttonLabel, ...rest }: FileUploadProps) => {
    const button = <Button buttontype="general">{buttonLabel || "Dosya Seç"}</Button>;
    return <GibFileUpload {...rest} formButton={formButton || button} />;
};

export default FileUpload;
