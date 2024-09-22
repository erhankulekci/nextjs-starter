import { useState, useEffect } from "react";

interface WindowSize {
    width: number;
    height: number;
}

const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });

    useEffect(() => {
        const hasWindow = typeof window !== "undefined";
        if (hasWindow) {
            const getWindowSize = (): WindowSize => {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            };

            const handleWindowResize = (): void => {
                setWindowSize(getWindowSize());
            };

            setWindowSize(getWindowSize());

            window.addEventListener("resize", handleWindowResize);
            return () => {
                window.removeEventListener("resize", handleWindowResize);
            };
        }
    }, []);

    return windowSize;
};

export default useWindowSize;
