"use client";
import React from "react";
import { Locale } from "@/root/i18n.config";
import styles from "../header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "@gib-ui/core";

const Logo = ({ lang }: { lang: Locale }) => {
    const { width } = useWindowSize();
    return (
        <Link className={styles.link} href={`/${lang}/portal`}>
            <Image
                src={width < 600 ? "/Logo-light-mini.svg" : "/Logo-light.svg"}
                width={width < 600 ? 63 : 230}
                height={35}
                alt="logo"
            />
        </Link>
    );
};

export default Logo;
