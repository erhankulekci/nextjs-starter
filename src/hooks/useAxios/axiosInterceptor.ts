"use client";
import { navigate } from "@/utils/navigate";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const cookies = new Cookies(null, { path: "/" });
const token: string | null = cookies.get("token") || null;

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

interface message {
    code: string;
    text: string;
    type: string;
}

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (token) config.headers.Authorization = `Bearer ${token}`;

        if (config.data instanceof FormData) config.headers["Content-Type"] = "multipart/form-data";
        else config.headers["Content-Type"] = "application/json";

        return config;
    },
    function (error: AxiosError) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const newResponse = {
            ...response,
            data: {
                ...response.data,
                hasErrorOrWarningMessages: response?.data?.messages?.filter(
                    (message: message) => message.type === "ERROR" || message.type === "WARNING"
                ),
                hasSuccessOrInfoMessages: response?.data?.messages?.filter(
                    (message: message) => message.type === "SUCCESS" || message.type === "INFO"
                )
            }
        };
        return newResponse;
    },
    (error) => {
        if (error.response) {
            if (error?.response?.status === 401) {
                cookies.remove("token");
                navigate("/login");
            }
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
);

export const http = instance;
