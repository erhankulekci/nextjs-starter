"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}

export { default as ToastProvider } from "./toastProvider";
export { default as LoadingProvider } from "./loadingProvider";
