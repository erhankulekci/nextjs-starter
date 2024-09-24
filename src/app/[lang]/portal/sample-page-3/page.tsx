"use client";
import React from "react";
import { Locale } from "@/root/i18n.config";
import { Breadcrumbs, Stack } from "@sphinx-ui/core";
import { getTranslate } from "@/lib";
import { Step1, Step2, Summary, Drawer } from "./parts";
import { Alert, Stepper } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const SamplePage3 = ({ params }: { params: { lang: Locale } }) => {
    const { navigation, page } = getTranslate(params.lang);
    const styles = useAppSelector(customization);
    const steps = [
        {
            label: page.page3.stepLabel1,
            children: <Step1 lang={params.lang} />
        },
        {
            label: page.page3.stepLabel2,
            children: <Step2 lang={params.lang} />
        },
        {
            label: page.page3.summaryLabel,
            children: <Summary lang={params.lang} />
        }
    ];

    return (
        <Stack spacing={3}>
            <Breadcrumbs
                homePage={navigation.home}
                links={[
                    {
                        label: navigation.page3,
                        color: styles.primaryColor
                    }
                ]}
            />
            <Alert alertText="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat." />
            <Stepper
                DrawerContent={Drawer}
                showDrawer
                showConfirmButton
                confirmButtonLabel="Onay"
                steps={steps}
                locale={params.lang}
            />
        </Stack>
    );
};

export default SamplePage3;
