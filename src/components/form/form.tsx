"use client";
import React, { useEffect, useImperativeHandle } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useAxios } from "@/hooks";
import { Grid } from "@gib-ui/core";
import FormButtons from "./formButtons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type FormButtonsProps = {
    cancelButtonLabel?: string;
    resetButtonLabel?: string;
    confirmButtonLabel?: string;
    alignFormButtons?: "center" | "left" | "right";
    handleCancelButton?: () => void;
    onResetForm?: () => void;
};

interface FormProps extends FormButtonsProps {
    id?: string;
    mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all" | "onSubmit";
    schema?: yup.ObjectShape;
    noSortEdges?: Array<[string, string]>;
    defaultValues?: Record<string, any>;
    watchFields?: string[];
    getWatchedFields?: (watchedFields: unknown[]) => void;
    formRef?: React.Ref<unknown> | undefined;
    updatedFields?: Record<string, any>;
    resetForm?: boolean;
    handleResetForm?: () => void;
    children?: React.ReactNode;
    beforeSubmit?: (data: Record<string, any>) => Record<string, any>;
    afterSubmit?: (data: Record<string, unknown>) => void;
    method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
    url?: string;
    headers?: Record<string, string>;
    formData?: boolean;
    customtemplate?: boolean;
}

const Form = (props: FormProps) => {
    const { apiHandler } = useAxios();

    const hasFormButtons =
        props?.cancelButtonLabel || props?.resetButtonLabel || props?.confirmButtonLabel;

    const methods = useForm({
        mode: props?.mode || "onSubmit",
        resolver: yupResolver(
            yup
                .object()
                .shape(props?.schema || {}, props?.noSortEdges || [])
                .required()
        ),
        defaultValues: props?.defaultValues
    });

    useImperativeHandle(props.formRef, () => ({
        methods
    }));

    const watchedFields = props?.watchFields ? methods?.watch(props?.watchFields) : null;

    useEffect(() => {
        props.watchFields &&
            props?.getWatchedFields &&
            props?.getWatchedFields(methods?.watch(props?.watchFields));
    }, [JSON.stringify(watchedFields)]);

    const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
        if (props?.url) {
            let arrangedData = data;
            if (props?.beforeSubmit) {
                arrangedData = props?.beforeSubmit(data);
            }
            const config = {
                method: props?.method || "POST",
                url: props?.url,
                headers: props?.headers,
                data: props?.formData ? arrangedData : JSON.stringify(arrangedData)
            };
            await apiHandler(config, (res: Record<string, unknown>) => {
                props?.afterSubmit && props?.afterSubmit(res);
            });
        } else {
            props?.afterSubmit && props?.afterSubmit(data);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: "100%" }}>
                {props?.customtemplate ? (
                    props?.children
                ) : (
                    <Grid container display="flex" flexDirection="column" gap="1rem">
                        {props?.children}
                        {hasFormButtons && (
                            <FormButtons
                                cancelButtonLabel={props?.cancelButtonLabel}
                                resetButtonLabel={props?.resetButtonLabel}
                                confirmButtonLabel={props?.confirmButtonLabel}
                                onResetForm={() => methods?.reset()}
                            />
                        )}
                    </Grid>
                )}
            </form>
        </FormProvider>
    );
};

export default Form;
