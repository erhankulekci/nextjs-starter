"use client";
import { getTranslate } from "@/lib";
import { Locale } from "@/root/i18n.config";
import { Box, Breadcrumbs, Grid } from "@gib-ui/core";
import {
    Alert,
    Autocomplete,
    Button,
    Form,
    ListComponent,
    RadioGroup,
    TextField
} from "@/components";
import { columns, rows } from "@/enums/pages/samplePage1";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";

const SamplePage2 = ({ params }: { params: { lang: Locale } }) => {
    const { navigation, page } = getTranslate(params.lang);
    const styles = useAppSelector(customization);
    const { page2 } = page;

    return (
        <Box sx={{ display: "grid", gap: "24px" }}>
            <h1>{page2.title}</h1>
            <Breadcrumbs
                homePage={navigation.home}
                links={[
                    {
                        label: navigation.page2,
                        color: styles.primaryColor
                    }
                ]}
            />
            <Alert>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis quos molestiae sit
                voluptates excepturi quasi eum vero rem architecto. Aut enim iste doloribus
                architecto sequi molestiae itaque nemo omnis voluptate.
            </Alert>
            <Form>
                <Grid container xs={12} spacing={4}>
                    <Grid item lg={4} md={6} xs={12} display="grid" gap={2}>
                        <Autocomplete
                            id="autocomplete1"
                            items={[{ text: "test" }, { text: "hello" }, { text: "world" }]}
                            labeltext="Autocomplete 1"
                        />
                        <Autocomplete
                            id="autocomplete2"
                            items={[{ text: "test" }, { text: "hello" }, { text: "world" }]}
                            labeltext="Autocomplete 2"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} display="grid" gap={2}>
                        <TextField id="input1" labeltext="Input 1" />
                        <TextField id="input2" labeltext="Input 2" />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} display="grid" gap={2}>
                        <RadioGroup
                            labeltext="Radio Group 1"
                            id="radio 1"
                            buttons={[
                                {
                                    id: "option1",
                                    value: "option1",
                                    label: "Option 1"
                                },
                                {
                                    id: "option2",
                                    value: "option2",
                                    label: "Option 2"
                                }
                            ]}
                            optionsGap="0px"
                        />
                        <RadioGroup
                            labeltext="Radio Group 2"
                            id="radio 2"
                            buttons={[
                                {
                                    id: "option1",
                                    value: "option1",
                                    label: "Option 1"
                                },
                                {
                                    id: "option2",
                                    value: "option2",
                                    label: "Option 2"
                                }
                            ]}
                            optionsGap="0px"
                        />
                    </Grid>
                </Grid>
            </Form>
            <Grid xs={12}>
                <Grid xs={12} md={8} container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Button buttontype="primary" fullWidth>
                            Button 1
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button buttontype="secondary" fullWidth>
                            Button 2
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button buttontype="general" fullWidth>
                            Button 3
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button buttontype="generalSecondary" fullWidth>
                            Button 4
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <ListComponent columns={columns} rows={rows} locale={params.lang} />
        </Box>
    );
};

export default SamplePage2;
