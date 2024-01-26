import localFont from "next/font/local";

const poppins = localFont({
    src: [
        {
            path: "../assets/fonts/Poppins-Light.ttf",
            weight: "300"
        },
        {
            path: "../assets/fonts/Poppins-Regular.ttf",
            weight: "400"
        },
        {
            path: "../assets/fonts/Poppins-Medium.ttf",
            weight: "500"
        },
        {
            path: "../assets/fonts/Poppins-SemiBold.ttf",
            weight: "600"
        },
        {
            path: "../assets/fonts/Poppins-Bold.ttf",
            weight: "700"
        }
    ],
    variable: "--font-poppins"
});

export { poppins };
