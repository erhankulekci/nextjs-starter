import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <Link href="/portal">
            <Image src="/Logo-dark.svg" width={230} height={35} alt="logo" />
        </Link>
    );
};

export default Header;
