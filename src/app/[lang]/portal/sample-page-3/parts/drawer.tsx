"use client";
import React from "react";
import { Box, Card, Divider, IconButton, Stack } from "@sphinx-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { Button } from "@/components";
import { getTranslate } from "@/lib";
import { usePathname } from "next/navigation";
import { Locale } from "@/root/i18n.config";
import { Logo } from "@/components/header/components";
import { Icons } from "@gib-ui/icons";

const DrawerContent = ({ onClose }: { onClose: () => void }) => {
    const pathName = usePathname();
    const selectedLocale = pathName.split("/")[1] as Locale;
    const styles = useAppSelector(customization);
    const { page3 } = getTranslate(selectedLocale).page;

    const header = (
        <Box
            sx={{
                p: 2,
                backgroundColor: styles.primaryColor,
                color: "#FFF",
                height: "70px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Logo lang={selectedLocale} />
            <IconButton onClick={onClose}>
                <Icons.Close sx={{ color: "#FFF" }} />
            </IconButton>
        </Box>
    );

    const content = (
        <Box
            sx={{
                width: "100%",
                p: 2
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                    justifyItems: "center"
                }}
            >
                {[...Array(4)].map((_, index) => (
                    <Card
                        key={index}
                        actions={
                            <>
                                <Button fullWidth>{page3.drawerCardButton1}</Button>
                                <Button fullWidth>{page3.drawerCardButton2}</Button>
                            </>
                        }
                        cardMediaAlt="Example image"
                        cardMediaSx={{
                            height: 140
                        }}
                        cardMediaUrl="https://picsum.photos/id/20/300/200"
                        sx={{
                            maxWidth: 345
                        }}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </Card>
                ))}
            </div>
        </Box>
    );

    const footer = (
        <Stack display="flex" flexDirection="row" justifyContent="center" alignItems="center" p={2}>
            <Button onClick={onClose} buttontype="secondary">
                {page3.drawerCancelButton}
            </Button>
            <Button
                onClick={() => {
                    onClose();
                }}
                buttontype="primary"
                sx={{ ml: 2 }}
            >
                {page3.drawerConfirmButton}
            </Button>
        </Stack>
    );

    return (
        <Box height="100%" display="flex" flexDirection="column">
            {header}
            <Divider />
            {content}
            <Divider />
            {footer}
        </Box>
    );
};

export default DrawerContent;
