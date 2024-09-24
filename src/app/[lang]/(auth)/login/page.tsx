"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { Grid, IconButton, Typography } from "@sphinx-ui/core";
import { Button } from "@/components";
import { Form, InputField } from "@/components";
import { getTranslate } from "@/lib";
import { Locale } from "@/root/i18n.config";
import loginAnimation from "@/assets/animation/login.json";
import { Layout } from "../components";
import { Icons } from "@gib-ui/icons";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import { navigate } from "@/utils/navigate";

const LoginPage = ({ params }: { params: { lang: Locale } }) => {
    const searchParams = useSearchParams();
    const cookies = new Cookies();
    const { login } = getTranslate(params.lang).page;
    const [showPassword, setShowPassword] = React.useState(false);
    const { primaryColor } = useAppSelector(customization);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const beforeSubmit = (data: Record<string, any>) => {
        const payload = {
            username: data.emailUsername,
            password: data.password
        };
        return payload;
    };

    const afterSubmit = (res: any) => {
        if (!res?.hasErrorOrWarningMessages && res?.token) {
            cookies.set("token", res?.token, { path: "/" });
            const nextUrl = searchParams.get("redirectUrl");
            navigate(nextUrl || `/${params.lang}/portal`);
        }
    };

    return (
        <Layout animation={loginAnimation}>
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
                        {login.title}
                    </Typography>
                    <Typography>{login.description}</Typography>
                </Grid>
                <Grid item my={2}>
                    <Form
                        url="auth/login"
                        beforeSubmit={beforeSubmit}
                        afterSubmit={afterSubmit}
                        defaultValues={{ emailUsername: "", password: "" }}
                    >
                        <Grid container rowGap={3}>
                            <Grid item xs={12}>
                                <InputField
                                    id="emailUsername"
                                    name="emailUsername"
                                    labeltext={login.emailUsername}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    id="password"
                                    name="password"
                                    labeltext={login.password}
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
                                {login.submitButton}
                            </Button>
                        </Grid>
                    </Form>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Link href={`/${params.lang}/password-reset`}>
                        <Typography color="#878787" fontWeight={700}>
                            {login.passwordReset}
                        </Typography>
                    </Link>
                </Grid>
                <Grid container gap="3px" alignItems="center">
                    {login.question}
                    <Link href={`/${params.lang}/register`}>
                        <Typography fontWeight={700} color={primaryColor}>
                            {login.register}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default LoginPage;
