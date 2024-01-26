import type { Locale } from "../../i18n.config";
import { tr, en } from "@/translate";

const translates = {
    en,
    tr
};

const getTranslate = (locale: Locale) => translates[locale];

export default getTranslate;
