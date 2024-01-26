"use client";
import React from "react";
import { customization } from "@/redux/slices/customizationSlice";
import { Form, InputField, Autocomplete } from "@/components";
import { Grid, Stack, Typography } from "@gib-ui/core";
import { useAppSelector } from "@/redux/hooks";
import { Locale } from "@/root/i18n.config";
import { getTranslate } from "@/lib";

interface tab1Props {
    lang: Locale;
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

const Tab1 = (props: tab1Props) => {
    const { page3 } = getTranslate(props.lang).page;
    const styles = useAppSelector(customization);

    const items = [
        {
            text: "test"
        },
        {
            text: "hello"
        },
        {
            text: "world"
        }
    ];

    const afterSubmit = () => {
        props.setSelectedTab(1);
    };

    return (
        <Stack spacing={3}>
            <Typography sx={{ fontSize: "22px", fontWeight: "700", color: styles.primaryColor }}>
                {page3.tab1Title}
            </Typography>
            <Form
                afterSubmit={afterSubmit}
                defaultValues={{ test1: "", test2: "Hello World", test3: "", test4: "", test5: "" }}
                resetButtonLabel="Reset"
                confirmButtonLabel={page3.tab1ConfirmButtonLabel}
            >
                <Grid container flexWrap="nowrap" gap={2}>
                    <InputField
                        xs={12}
                        lg={6}
                        id="test1"
                        name="test1"
                        labeltext="Lorem Ipsum"
                        labelFocusedColor={styles.primaryColor}
                    />
                    <InputField
                        xs={12}
                        lg={6}
                        defaultValue="Hello World"
                        id="test2"
                        name="test2"
                        labeltext="Lorem Ipsum"
                        disabled
                        labelFocusedColor={styles.primaryColor}
                    />
                </Grid>
                <Grid container flexWrap="nowrap" gap={2}>
                    <Autocomplete
                        id="test3"
                        labelFocusedColor={styles.primaryColor}
                        items={items}
                        labeltext="Lorem Ipsum"
                        lg={6}
                        xs={12}
                    />
                    <Autocomplete
                        id="test4"
                        labelFocusedColor={styles.primaryColor}
                        items={items}
                        labeltext="Lorem Ipsum"
                        lg={6}
                        xs={12}
                    />
                </Grid>
                <Grid item>
                    <InputField
                        id="test5"
                        name="test5"
                        labeltext="Multiline"
                        labelFocusedColor={styles.primaryColor}
                        multiline
                        rows={8}
                        xs={12}
                    />
                </Grid>
            </Form>
        </Stack>
    );
};

export default Tab1;
