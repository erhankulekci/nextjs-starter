"use client";
import { Form, InputField, ListComponent } from "@/components";
import { columns, rows } from "@/enums/pages/samplePage1";
import { Breadcrumbs, Grid, Paper, Stack, useWindowSize } from "@gib-ui/core";
import { Locale } from "@/root/i18n.config";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { getTranslate } from "@/lib";
import * as yup from "yup";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const SamplePage1 = ({ params }: { params: { lang: Locale } }) => {
    const { navigation, page } = getTranslate(params.lang);
    const styles = useAppSelector(customization);

    const { width } = useWindowSize();
    const [gridRows, setGridRows] = useState(rows);
    const formRef = useRef<any>();
    const { enqueueSnackbar } = useSnackbar();
    const schema = {
        firstName: yup.string().required(page.page1.formValidationMessage),
        lastName: yup.string().required(page.page1.formValidationMessage),
        age: yup.string().required(page.page1.formValidationMessage)
    };

    const afterSubmit = (res: any) => {
        const { firstName, lastName, age } = res;
        const newEntry = {
            id: gridRows.length + 1,
            firstName: firstName || "",
            lastName: lastName || "",
            age: age || ""
        };
        setGridRows([...gridRows, newEntry]);
        formRef?.current?.methods?.reset();
        enqueueSnackbar(page.page1.snackbarMessage, {
            variant: "success"
        });
    };

    return (
        <Stack spacing={3} ml={width < 1200 ? "22px" : "0"}>
            <Breadcrumbs
                homePage={navigation.home}
                links={[
                    {
                        label: navigation.page1,
                        color: styles.primaryColor
                    }
                ]}
            />
            <Paper style={{ padding: "1rem", display: "grid" }}>
                <Form
                    formRef={formRef}
                    afterSubmit={afterSubmit}
                    confirmButtonLabel={page.page1.submitButton}
                    resetButtonLabel={page.page1.resetButton}
                    defaultValues={{ firstName: "", lastName: "", age: "" }}
                    schema={schema}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InputField
                                id="firstName"
                                name="firstName"
                                labeltext={page.page1.firstName}
                                inputProps={{
                                    maxLength: 50,
                                    inputMode: "text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField
                                id="lastName"
                                name="lastName"
                                labeltext={page.page1.lastName}
                                inputProps={{
                                    maxLength: 50,
                                    inputMode: "text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField
                                inputProps={{
                                    maxLength: 4,
                                    inputMode: "numeric"
                                }}
                                id="age"
                                name="age"
                                labeltext={page.page1.age}
                            />
                        </Grid>
                    </Grid>
                </Form>
                <ListComponent locale={params.lang} columns={columns} rows={gridRows} />
            </Paper>
        </Stack>
    );
};

export default SamplePage1;
