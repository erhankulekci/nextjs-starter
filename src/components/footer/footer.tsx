"use client";
import React from "react";
import { Footer } from "@sphinx-ui/core";
import { Locale } from "@/root/i18n.config";
import { getTranslate } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { customization } from "@/redux/slices/customizationSlice";
import styles from "./footer.module.css";
import { Logo } from "../header/components";

const SampleFooter = ({ lang }: { lang: Locale }) => {
    const { section1, section2, section3 } = getTranslate(lang).footer;
    const customizationStyles = useAppSelector(customization);

    const sections = [
        {
            headerText: section1.header,
            links: [
                {
                    href: "#",
                    text: "Lorem ipsum"
                },
                {
                    href: "#",
                    text: "Lorem ipsum"
                },
                {
                    href: "#",
                    text: "Lorem ipsum"
                }
            ]
        },
        {
            headerText: section2.header,
            links: [
                {
                    href: "#",
                    text: "Lorem ipsum"
                },
                {
                    href: "#",
                    text: "Lorem ipsum"
                },
                {
                    href: "#",
                    text: "Lorem ipsum"
                }
            ]
        },
        {
            headerText: section3.header,
            links: [
                {
                    href: "#",
                    text: "Lorem ipsum"
                },
                {
                    href: "#",
                    text: "Lorem ipsum"
                },
                {
                    href: "#",
                    text: "Lorem ipsum"
                }
            ]
        }
    ];
    const customStyles = {
        footer: { zIndex: -1 },
        contentBottom: {
            paddingBottom: "0 !important"
        },
        content: {
            alignItems: "center"
        }
    };
    const ContentLeft = () => {
        return <Logo />;
    };
    return (
        <>
            <Footer
                background={customizationStyles.footerBgColor}
                sections={sections}
                mobileViewSize={964}
                customStyles={customStyles}
                contentLeft={<ContentLeft />}
                contentBottom={
                    <div className={styles.copyRightContainer}>
                        <span className={styles.copyRightText}>
                            Copyright © {new Date().getFullYear()} Sphinx
                        </span>
                    </div>
                }
            />
        </>
    );
};

export default SampleFooter;
