import React from "react";
import { Box, Grid, Stack } from "@gib-ui/core";
import { Header } from ".";
import dynamic from "next/dynamic";
import { useWindowSize } from "@/hooks";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Layout = ({ children, animation }: { children: React.ReactNode; animation: any }) => {
    const { width } = useWindowSize();
    return (
        <Stack
            spacing={3}
            sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                width: "90%",
                height: "90vh",
                maxWidth: "1400px"
            }}
        >
            <Header />
            <Box
                sx={{
                    display: "grid",
                    placeItems: "center",
                    gridTemplateColumns: width < 1200 ? "1fr" : "repeat(2, 1fr)"
                }}
            >
                <Grid item display={{ xs: "none", lg: "inline-flex" }}>
                    <Lottie
                        animationData={animation}
                        loop={true}
                        style={{
                            width: "500px",
                            height: "500px"
                        }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        padding: { xs: "30px", lg: "50px" },
                        borderRadius: "20px",
                        boxShadow: "0px 3px 15px 0px rgba(0, 0, 0, 0.15)"
                    }}
                >
                    {children}
                </Grid>
            </Box>
        </Stack>
    );
};

export default Layout;
