"use client";
import * as React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animation/loading.json";
import { Backdrop } from "@gib-ui/core";

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
