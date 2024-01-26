import { Box, Card } from "@gib-ui/core";
import React from "react";
import logo from "../../../../public/100ico.svg";
import Image from "next/image";

const NotificationCard = () => {
    return (
        <Card
            sx={{
                position: "absolute",
                top: "3.1rem",
                right: "20rem",
                maxWidth: "30rem"
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "6rem"
                }}
            >
                <Box>Bildirimler</Box>
                <span style={{ cursor: "pointer", color: "blue" }}>Tümü</span>
            </Box>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "1rem",
                    background: "#effbff",
                    padding: "0.75rem",
                    cursor: "pointer"
                }}
            >
                <Image src={logo} width={50} height={50} alt="logo" />
                <Box>
                    Dijital Vergi Dairesinin 7/10/2023 tarihinde hizmete açılması ile İnteraktif
                    Vergi Dairesi (ivd.gib.gov.tr), İnternet Vergi Dairesi...
                </Box>
                <span
                    style={{
                        height: "15px",
                        width: "50px",
                        backgroundColor: "rgb(43, 127, 183)",
                        borderRadius: "50%",
                        display: "inline-block"
                    }}
                ></span>
            </Box>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "1rem",
                    background: "#effbff",
                    padding: "0.75rem",
                    cursor: "pointer"
                }}
            >
                <Image src={logo} width={50} height={50} alt="logo" />
                <Box>
                    Dijital Vergi Dairesinin 7/10/2023 tarihinde hizmete açılması ile İnteraktif
                    Vergi Dairesi (ivd.gib.gov.tr), İnternet Vergi Dairesi...
                </Box>
                <span
                    style={{
                        height: "15px",
                        width: "50px",
                        backgroundColor: "rgb(43, 127, 183)",
                        borderRadius: "50%",
                        display: "inline-block"
                    }}
                ></span>
            </Box>
        </Card>
    );
};

export default NotificationCard;
