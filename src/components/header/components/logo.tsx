"use client";
import React from "react";
import { Locale } from "@/root/i18n.config";
import styles from "../header.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/images/headerLogo.webp";
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
        <Link className={styles.link} href={`/${lang}/portal`}>
            <Box className={styles.logoContainer}>
                <Image
                    src={logo}
                    width={logoWidth || 45}
                    height={logoHeight || 45}
                    alt="logo"
                    className={styles.logoImage}
                />
                <Box className={styles.logoTextContainer}>
                    <span className={styles.logoMainText}>SPHINX</span>
                    <span className={styles.logoSubText}> STARTER PROJECT</span>
                </Box>
            </Box>
        </Link>
    );
};

export default Logo;
