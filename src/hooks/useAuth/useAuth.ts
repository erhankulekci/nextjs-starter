"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const cookies = new Cookies(null, { path: "/" });
        const token: string | null = cookies.get("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return isAuthenticated;
};

export default useAuth;
