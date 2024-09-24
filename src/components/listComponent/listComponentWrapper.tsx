import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { Box } from "@sphinx-ui/core";
import React from "react";

const ListComponentWrapper = ({ children }: { children: React.ReactNode }) => {
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
            <>{children}</>
        </Box>
    );
};

export default ListComponentWrapper;
