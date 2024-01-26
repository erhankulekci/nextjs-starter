"use client";
import React from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Icons } from "@gib-ui/icons";

interface ToastProviderProps {
    children: React.ReactNode;
    maxSnack?: number;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
    variant?: "error" | "default" | "success" | "warning" | "info" | undefined;
    preventDuplicate?: boolean;
}

const ToastProvider = ({
    children,
    maxSnack = 4,
    anchorOrigin = {
        vertical: "top",
        horizontal: "center"
    },
    variant = "error",
    preventDuplicate
}: ToastProviderProps) => {
    const options = {
        autoHideDuration: 8000,
        disableWindowBlurListener: true,
        anchorOrigin,
        maxSnack,
        preventDuplicate,
        variant
    };

    return (
        <SnackbarProvider
            hideIconVariant
            action={(snackbarId) => (
                <button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#FFF",
                        cursor: "pointer"
                    }}
                    onClick={() => closeSnackbar(snackbarId)}
                >
                    <Icons.Close />
                </button>
            )}
            {...options}
        >
            {children}
        </SnackbarProvider>
    );
};

export default ToastProvider;
