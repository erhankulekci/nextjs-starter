"use client";
import * as React from "react";
import loadingAnimation from "@/assets/animation/loading.json";
import { Backdrop } from "@sphinx-ui/core";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface BackdropProps {
    open: boolean;
}

const Loading = (props: BackdropProps) => {
    return (
        <Backdrop open={props.open}>
            <Lottie
                animationData={loadingAnimation}
                loop={true}
                style={{
                    width: "150px",
                    height: "150px"
                }}
            />
        </Backdrop>
    );
};

export default Loading;
