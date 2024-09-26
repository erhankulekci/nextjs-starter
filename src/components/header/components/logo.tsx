"use client";
import React from "react";
import { Locale } from "@/root/i18n.config";
import styles from "../header.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/images/logo.svg";
import content from "../../../assets/images/content.svg";
import { Box } from "@sphinx-ui/core";

const Logo = ({
    lang,
    logoWidth,
    logoHeight
}: {
    lang?: Locale;
    logoWidth?: number;
    logoHeight?: number;
}) => {
    return (
        <Link href={`/${lang}/portal`}>
            <Box className={styles.logoContainer}>
                <Image src={logo} width={logoWidth || 80} height={logoHeight || 45} alt="logo" />
                <Image
                    src={content}
                    width={logoWidth || 120}
                    height={logoHeight || 45}
                    alt="logo"
                />
            </Box>
        </Link>
    );
};

export default Logo;
