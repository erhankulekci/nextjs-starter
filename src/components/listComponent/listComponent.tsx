"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, DataGridProps } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { useAxios } from "@/hooks";
import ListComponentWrapper from "./listComponentWrapper";

interface GridPaginationModel {
    pageSize: number;
    page: number;
}

type GridColumnVisibilityModel = Record<any["field"], boolean>;

type GridSortDirection = "asc" | "desc" | null | undefined;
interface GridSortItem {
    field: string;
    sort: GridSortDirection;
}

type GridSortModel = GridSortItem[];

interface GridFilterItem {
    id?: number | string;
    field: string;
    value?: any;
    operator: string;
}

enum GridLogicOperator {
    And = "and",
    Or = "or"
}

interface GridFilterModel {
    items: GridFilterItem[];
    logicOperator?: GridLogicOperator;
    quickFilterValues?: any[];
    quickFilterLogicOperator?: GridLogicOperator;
    quickFilterExcludeHiddenColumns?: boolean;
}

interface ListComponentProps extends Omit<DataGridProps, "rows"> {
    method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
    url?: string;
    blockRequest?: boolean;
    mapDataBeforeList?: (res: object) => object;
    staticData?: {
        [key: string | symbol]: any;
    }[];
    sortField?: string;
    sortType?: "asc" | "desc";
}

const ListComponent = ({
    sx,
    staticData,
    sortField: field = "id",
    sortType: sort = "desc",
    ...props
}: ListComponentProps) => {
    const styles = useAppSelector(customization);
    const { apiHandler } = useAxios();
    const [data, setData] = useState<any>({
        rows: [],
        pageDetails: { total: 0, totalPage: 1 }
    });
    const [filters, setFilters] = useState<any>([]);
    const initialSortModel = [{ field, sort }];
    const [sortModel, setSortModel] = useState<GridSortModel>(initialSortModel);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5
    });

    useEffect(() => {
        if (!staticData && !props?.blockRequest) fetchTableData();
    }, [filters]);

    const rowCountRef = React.useRef(data?.pageDetails?.total);
    const rowCount = React.useMemo(() => {
        if (data?.pageDetails?.total !== undefined) {
            rowCountRef.current = data?.pageDetails?.total;
        }
        return rowCountRef.current;
    }, [data?.pageDetails?.total]);

    const handlePaginationChange = (paginationModel: GridPaginationModel) => {
        if (!staticData) {
            setPaginationModel(paginationModel);
            !props?.blockRequest &&
                fetchTableData({
                    tempPageIndex: paginationModel?.page,
                    tempPageSize: paginationModel?.pageSize
                });
        }
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        setSortModel([...sortModel]);
        fetchTableData({
            tempSortModel: [...sortModel]
        });
    };

    const onFilterChange = React.useCallback(({ items }: GridFilterModel) => {
        setFilters(items);
    }, []);

    const fetchTableData = async (
        params: {
            tempPageIndex?: number;
            tempPageSize?: number;
            tempSortModel?: GridSortModel;
        } = {}
    ) => {
        const {
            tempPageIndex = paginationModel?.page,
            tempPageSize = paginationModel?.pageSize,
            tempSortModel = sortModel
        } = params;

        const config = {
            method: props?.method || "POST",
            url: props?.url,
            data: {
                meta: {
                    page: tempPageIndex,
                    pageSize: tempPageSize,
                    sortModel: tempSortModel,
                    filterModel: filters
                }
            }
        };

        await apiHandler(config, (res) => {
            let newResponse = res;
            if (props?.mapDataBeforeList) newResponse = props?.mapDataBeforeList(newResponse);
            if (newResponse)
                setData({
                    rows: newResponse,
                    pageDetails: res?.pageDetail
                });
        });
    };

    const [columnVisibilityModel, setColumnVisibilityModel] =
        React.useState<GridColumnVisibilityModel>({
            id: false
        });

    return (
        <ListComponentWrapper>
            {staticData ? (
                <DataGrid
                    sx={sx}
                    rows={staticData}
                    columnBgColor={styles.primaryDarkColor}
                    paginationButtonColor={styles.primaryColor}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                    {...props}
                />
            ) : (
                <DataGrid
                    sx={sx}
                    rows={data?.rows}
                    rowCount={rowCount}
                    pageSizeOptions={[5, 10, 20, 50]}
                    columnBgColor={styles.primaryDarkColor}
                    paginationButtonColor={styles.primaryColor}
                    totalPageCount={data?.pageDetails?.totalPage}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={(model: GridPaginationModel) =>
                        handlePaginationChange(model)
                    }
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                    sortingMode="server"
                    onSortModelChange={handleSortModelChange}
                    filterMode="server"
                    onFilterModelChange={onFilterChange}
                    {...props}
                />
            )}
        </ListComponentWrapper>
    );
};

export default ListComponent;
