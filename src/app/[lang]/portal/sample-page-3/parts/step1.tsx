import React, { useState } from "react";
import { Locale } from "@/root/i18n.config";
import { Paper } from "@sphinx-ui/core";
import { getTranslate } from "@/lib";
import { Tab1, Tab2 } from "./tabs";
import { Tabs } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const Step1 = ({ lang }: { lang: Locale }) => {
    const { page3 } = getTranslate(lang).page;
    const styles = useAppSelector(customization);

    const [selectedTab, setSelectedTab] = useState<number>(0);

    return (
        <Paper sx={{ my: "2rem" }}>
            <Tabs
                fullWidth
                centered
                tabItems={[
                    {
                        children: <Tab1 lang={lang} setSelectedTab={setSelectedTab} />,
                        label: page3.tabLabel1,
                        value: 0
                    },
                    {
                        children: <Tab2 lang={lang} />,
                        label: page3.tabLabel2,
                        value: 1
                    }
                ]}
                selectedTab={selectedTab}
                selectedTabSx={{
                    backgroundColor: styles.primaryColor,
                    opacity: 0.5,
                    color: "#FFF"
                }}
                tabIndicatorSx={{
                    backgroundColor: styles.primaryColor
                }}
            />
        </Paper>
    );
};

export default Step1;
