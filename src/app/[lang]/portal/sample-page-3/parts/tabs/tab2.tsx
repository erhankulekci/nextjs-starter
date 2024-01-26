import { FileUpload } from "@/components";
import { getTranslate } from "@/lib";
import { Locale } from "@/root/i18n.config";
import React from "react";

const Tab2 = ({ lang }: { lang: Locale }) => {
    const { page3 } = getTranslate(lang).page;
    return (
        <FileUpload
            locale={lang}
            buttonLabel={page3.fileUploadButtonLabel}
            description={page3.fileUploadDescription}
        />
    );
};

export default Tab2;
