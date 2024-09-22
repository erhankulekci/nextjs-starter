"use client";
import React from "react";
import Link from "next/link";
import { Grid, IconButton, Typography } from "@gib-ui/core";
import { Button } from "@/components";
import { Form, InputField } from "@/components";
import { getTranslate } from "@/lib";
import { Locale } from "@/root/i18n.config";
import registerAnimation from "@/assets/animation/register.json";
import { Layout } from "../components";
import { Icons } from "@gib-ui/icons";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { navigate } from "@/utils/navigate";

const RegisterPage = ({ params }: { params: { lang: Locale } }) => {
    const { register } = getTranslate(params.lang).page;
    const [showPassword, setShowPassword] = React.useState(false);
    const { primaryColor } = useAppSelector(customization);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const afterSubmit = () => {
        navigate(`/${params.lang}/login`);
    };

    return (
        <Layout animation={registerAnimation}>
            <Grid
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                rowGap="1rem"
            >
                <Grid container flexDirection="column" alignItems="center">
                    <Typography fontSize="2rem" fontWeight={700}>
                        {register.title}
                    </Typography>
                </Grid>
                <Grid item my={2}>
                    <Form
                        afterSubmit={afterSubmit}
                        defaultValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: ""
                        }}
                    >
                        <Grid container rowGap={3}>
                            <Grid container gap={2} flexWrap="nowrap">
                                <InputField
                                    xs={6}
                                    id="firstName"
                                    name="firstName"
                                    labeltext={register.firstName}
                                />
                                <InputField
                                    xs={6}
                                    id="lastName"
                                    name="lastName"
                                    labeltext={register.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField id="email" name="email" labeltext={register.email} />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    id="password"
                                    name="password"
                                    labeltext={register.password}
                                    type={showPassword ? "text" : "password"}
                                    endicon={
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <Icons.Visibility />
                                            ) : (
                                                <Icons.VisibilityOff />
                                            )}
                                        </IconButton>
                                    }
                                />
                            </Grid>
                            <Button type="submit" buttontype="primary" fullWidth>
                                {register.submitButton}
                            </Button>
                        </Grid>
                    </Form>
                </Grid>
                <Grid container gap="3px" alignItems="center">
                    {register.question}
                    <Link href={`/${params.lang}/login`}>
                        <Typography fontWeight={700} color={primaryColor}>
                            {register.login}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default RegisterPage;
