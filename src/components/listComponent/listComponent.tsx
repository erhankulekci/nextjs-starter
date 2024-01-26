"use client";
import React from "react";
import { Box, DataGrid, DataGridProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const ListComponent = ({ sx, ...props }: DataGridProps) => {
    const styles = useAppSelector(customization);

    return (
        <Box
            sx={{
                display: "grid",
                "& .MuiDataGrid-root": {
                    fontSize: styles.fontSize,
                    borderRadius: styles.borderRadius
                },
                "& .MuiDataGrid-cell": { fontSize: styles.fontSize },
                "& .MuiDataGrid-columnHeaders": {
                    borderTopLeftRadius: styles.borderRadius,
                    borderTopRightRadius: styles.borderRadius
                },
                "& .MuiTablePagination-toolbar": { fontSize: styles.fontSize },
                "& .MuiTablePagination-selectLabel": { fontSize: styles.fontSize },
                "& .MuiPaginationItem-root": { fontSize: styles.fontSize },
                "& .MuiTablePagination-displayedRows": { fontSize: styles.fontSize }
            }}
        >
            <DataGrid
                sx={{
                    ...sx
                }}
                columnBgColor={styles.primaryDarkColor}
                paginationButtonColor={styles.primaryColor}
                {...props}
            />
        </Box>
    );
};

export default ListComponent;
