import React, { useState } from "react";
import { ListComponent, Paper } from "@/components";
import { BubbleFilters, Grid } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { Locale } from "@/root/i18n.config";
import { getTranslate } from "@/lib";
import { borcDurumList, filterDataList, odemeYontemiList, tecilBilgisiList } from "./mockData";
import { columns, rows } from "@/enums/pages/samplePage1";

const Step2 = ({ lang }: { lang: Locale }) => {
    const styles = useAppSelector(customization);
    const { page3 } = getTranslate(lang).page;
    const [filterData, setFilterData] = useState(filterDataList);
    const [selectedFilterData, setSelectedFilterData] = useState([]);
    const [query, setQuery] = useState("");
    const [borcDurum, setBorcDurum] = useState();
    const [tecil, setTecil] = useState();
    const [odeme, setOdeme] = useState();

    const clearDropdowns = () => {
        setBorcDurum(undefined);
        setOdeme(undefined);
        setTecil(undefined);
    };

    const dropdownItems = [
        {
            id: "borcDurum",
            value: borcDurum,
            onChange: (_: any, newValue: any) => {
                setBorcDurum(newValue);
            },
            labeltext: "Borç Durum Bilgisi",
            labelFocusedColor: styles.primaryColor,
            items: borcDurumList
        },
        {
            id: "tecilBilgisi",
            value: tecil,
            onChange: (_: any, newValue: any) => {
                setTecil(newValue);
            },
            labeltext: "Tecil Bilgisi",
            labelFocusedColor: styles.primaryColor,
            items: tecilBilgisiList
        },
        {
            id: "odemeYontemi",
            value: odeme,
            onChange: (_: any, newValue: any) => {
                setOdeme(newValue);
            },
            items: odemeYontemiList,
            labeltext: "Ödeme Yöntemi",
            labelFocusedColor: styles.primaryColor
        }
    ];

    return (
        <>
            <Grid item mt="2rem">
                <BubbleFilters
                    title={page3.bubbleFiltersTitle}
                    placeholder={page3.bubbleFiltersPlaceholder}
                    resetButtonLabel={page3.bubbleFiltersResetButton}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    selectedFilterData={selectedFilterData}
                    setSelectedFilterData={setSelectedFilterData}
                    query={query}
                    setQuery={setQuery}
                    dropdownItems={dropdownItems}
                    clearDropdowns={clearDropdowns}
                    color={styles.primaryColor}
                    headerSx={{ color: styles.primaryColor }}
                    resetButtonSx={{ color: styles.primaryColor, borderColor: styles.primaryColor }}
                />
            </Grid>
            <Paper sx={{ py: 3, my: "2rem", display: "grid" }}>
                <ListComponent locale={lang} columns={columns} rows={rows} />
            </Paper>
        </>
    );
};

export default Step2;
