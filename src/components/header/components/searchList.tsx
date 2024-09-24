import { Box, Grid, IconButton, Stack, Typography } from "@sphinx-ui/core";
import { Icons } from "@gib-ui/icons";
import React from "react";

interface SearchListProps {
    title: string;
    width: string;
    limit: boolean;
    children: React.ReactNode;
    handleExpand: (title: string) => void;
}

const SearchList = ({ title, width, limit, children, handleExpand }: SearchListProps) => (
    <Stack spacing={3}>
        <Grid item display="flex" justifyContent="space-between">
            <Typography fontSize="20px" fontWeight={700}>
                {title}
            </Typography>
            <Grid item onClick={() => handleExpand(title)}>
                <IconButton>{limit ? <Icons.ExpandMore /> : <Icons.ExpandLess />}</IconButton>
            </Grid>
        </Grid>
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(${width}px, 1fr))`,
                gap: "1rem"
            }}
        >
            {children}
        </Box>
    </Stack>
);

export default SearchList;
