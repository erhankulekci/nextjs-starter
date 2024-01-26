"use client";
import React, { createContext, useState } from "react";
import { Loading } from "@/components";

export const LoadingContext = createContext<{
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    isLoading: false,
    setIsLoading: () => {}
});

interface LoadingProvider {
    children?: React.ReactNode;
}

const LoadingProvider = (props: LoadingProvider) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {props.children}
            <Loading open={isLoading} />
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
