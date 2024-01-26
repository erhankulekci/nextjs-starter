import React from "react";
import styles from "./auth.module.css";
import "@/app/globals.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.container}>{children}</div>;
};

export default AuthLayout;
