import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Card, Grid, SearchInput, Stack } from "@sphinx-ui/core";
import { useWindowSize } from "@/hooks";

const SearchLayout = ({ children }: { children: React.ReactElement }) => {
    const { width } = useWindowSize();
    const [searchText, setSearchText] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const searchModalRef = useRef<HTMLDivElement | null>(null);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        if (searchText.length > 0) setOpen(true);
        else setOpen(false);
    }, [searchText]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (open) {
            if (searchModalRef.current && searchModalRef.current.contains(event.target as Node))
                return;
            else setOpen(false);
        }
    };

    return (
        <>
            {width >= 1200 && (
                <Grid container sx={{ position: "relative", px: "200px" }}>
                    <Grid item flexGrow={1}>
                        <SearchInput onChange={handleSearch} />
                    </Grid>
                    <Backdrop open={open} onClick={handleBackdropClick as any}>
                        <div
                            ref={searchModalRef}
                            style={{
                                zIndex: 999,
                                position: "absolute",
                                top: "50px"
                            }}
                        >
                            <Card
                                sx={{
                                    width: "80vw",
                                    maxHeight: "calc(100vh - 100px)",
                                    minHeight: "70vh",
                                    overflowY: "auto"
                                }}
                            >
                                <Stack spacing={3}>{children}</Stack>
                            </Card>
                        </div>
                    </Backdrop>
                </Grid>
            )}
        </>
    );
};

export default SearchLayout;
