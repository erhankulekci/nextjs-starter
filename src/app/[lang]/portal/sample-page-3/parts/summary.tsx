import { Form, InputField } from "@/components";
import { getTranslate } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { Locale } from "@/root/i18n.config";
import { Grid, Paper, Stack, Typography } from "@sphinx-ui/core";
import React from "react";

const Summary = ({ lang }: { lang: Locale }) => {
    const { page3 } = getTranslate(lang).page;
    const styles = useAppSelector(customization);
    const mockInputs = (
        <Grid container flexWrap="nowrap" gap="50px" my={1}>
            <InputField
                xs={12}
                lg={6}
                id="test1"
                name="test1"
                labeltext="Lorem Ipsum"
                defaultValue="Lorem Ipsum"
                disabled
            />
            <InputField
                xs={12}
                lg={6}
                labeltext="Lorem Ipsum"
                defaultValue="Lorem Ipsum"
                id="test2"
                name="test2"
                disabled
            />
        </Grid>
    );
    return (
        <Paper sx={{ my: "2rem" }}>
            <Stack spacing={3} width="100%">
                <Typography
                    sx={{ fontSize: "22px", fontWeight: "700", color: styles.primaryColor }}
                >
                    {page3.summaryTitle}
                </Typography>
                <Form>
                    {[...Array(4)].map((_, index) => (
                        <div key={index}>{mockInputs}</div>
                    ))}
                    <Grid item>
                        <InputField
                            id="test5"
                            name="test5"
                            labeltext="Multiline"
                            multiline
                            rows={8}
                            xs={12}
                            defaultValue={
                                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur illo laudantium voluptate ut libero porro quia ab similique, cumque quae magni voluptatum obcaecati. Consequuntur facere accusamus repellat quis, consectetur ratione. Tempora odio voluptatibus eum incidunt nobis hic suscipit quia! Voluptate eius omnis explicabo accusamus commodi molestiae culpa eveniet voluptas reiciendis reprehenderit mollitia rerum quidem eaque alias exercitationem, beatae dolor dignissimos!"
                            }
                        />
                    </Grid>
                </Form>
            </Stack>
        </Paper>
    );
};

export default Summary;
