"use client";
import { AxiosResponse } from "axios";
import { useCallback, useContext } from "react";
import { http } from "./axiosInterceptor";
import { useSnackbar } from "notistack";
import { LoadingContext } from "@/providers/loadingProvider";

interface message {
    code: string;
    text: string;
    type: string;
}

type variant = "default" | "error" | "success" | "warning" | "info";

const useAxios = () => {
    const { setIsLoading } = useContext(LoadingContext);
    const { enqueueSnackbar } = useSnackbar();

    const processMessages = (messages: message[]) => {
        messages &&
            messages?.forEach((message) => {
                enqueueSnackbar(message?.text, {
                    variant: message?.type.toLowerCase() as variant
                });
            });
    };

    const successHandler = (
        res: AxiosResponse,
        displaySuccessToast: boolean,
        displayErrorToast: boolean
    ) => {
        if (res?.data?.messages) {
            if (displaySuccessToast) {
                processMessages(
                    res?.data?.messages?.filter(
                        (message: message) =>
                            message?.type === "SUCCESS" || message?.type === "INFO"
                    )
                );
            }
            if (displayErrorToast) {
                processMessages(
                    res?.data?.messages?.filter(
                        (message: message) =>
                            message?.type === "ERROR" || message?.type === "WARNING"
                    )
                );
            }
        }
        setIsLoading(false);
    };

    const errorHandler = (error: any) => {
        if (error?.response) {
            const item =
                error?.response?.data?.messages?.find(
                    (message: message) => message?.type === "ERROR"
                ) ||
                error?.response?.data?.messages?.find(
                    (message: message) => message?.type === "WARNING"
                ) ||
                error?.response?.data?.messages?.find(
                    (message: message) => message?.type === "INFO"
                );
            const errorMessage =
                error?.response?.data?.errorMessage ||
                error?.response?.data?.warningMessage ||
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                item?.text;

            errorMessage &&
                enqueueSnackbar(errorMessage, {
                    variant: item?.type.toLowerCase() || "error"
                });
        }
    };

    const apiHandler = useCallback(
        async (
            config: Record<string, any>,
            callBackFunc: (data: AxiosResponse["data"]) => void,
            loading = true,
            displaySuccessToast = true,
            displayErrorToast = true
        ) => {
            return new Promise((resolve, reject) => {
                try {
                    if (loading) setIsLoading(true);
                    return http({
                        url: config?.url,
                        method: config?.method || "POST",
                        data: config?.data,
                        headers: config?.headers,
                        params: config?.params
                    })
                        .then((res) => {
                            successHandler(res, displaySuccessToast, displayErrorToast);
                            callBackFunc(res?.data);
                            resolve(res?.data);
                        })
                        .catch((error) => {
                            errorHandler(error);
                            setIsLoading(false);
                            reject(error);
                        });
                } catch (error) {
                    reject(false);
                }
            });
        },
        []
    );

    return { apiHandler };
};

export default useAxios;
