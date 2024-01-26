import { CustomizationState } from "@/redux/slices/customizationSlice";
import { Box } from "@gib-ui/core";
import { Icons } from "@gib-ui/icons";
import React from "react";

const DrawerOpener = ({
    customizationStyles,
    setIsOpen
}: {
    customizationStyles: CustomizationState;
    setIsOpen: (e: boolean) => void;
}) => {
    return (
        <Box
            sx={{
                backgroundColor: customizationStyles.primaryColor,
                width: "48px",
                height: "48px",
                position: "absolute",
                right: "1rem",
                top: "90vh",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: "grid",
                placeContent: "center",
                borderRadius: "100%",
                cursor: "pointer"
            }}
            onClick={() => setIsOpen(true)}
        >
            <Icons.Settings
                sx={{
                    color: "#FFF"
                }}
                fontSize="large"
            />
        </Box>
    );
};

export default DrawerOpener;
