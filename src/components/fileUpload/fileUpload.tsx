"use client";
import React from "react";
import { FileUpload as SphinxFileUpload, FileUploadProps } from "@sphinx-ui/core";
import { Button } from "@/components";

const FileUpload = ({ formButton, buttonLabel, ...rest }: FileUploadProps) => {
    const button = <Button buttontype="general">{buttonLabel || "Dosya Seç"}</Button>;
    return <SphinxFileUpload {...rest} formButton={formButton || button} />;
};

export default FileUpload;
