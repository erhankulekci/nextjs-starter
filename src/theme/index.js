import { createTheme } from "@sphinx-ui/core";

// assets
import colors from "../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const themeOption = {
        colors: colors,
        heading: colors.grey900,
        paper: colors.paper,
        backgroundDefault: colors.paper,
        background: colors.primaryLight,
        darkTextPrimary: colors.grey700,
        darkTextSecondary: colors.grey500,
        textDark: colors.grey900,
        menuSelected: colors.secondaryDark,
        menuSelectedBack: colors.secondaryLight,
        divider: colors.grey200,
        customization
    };

    const themeOptions = {
        direction: "ltr",
        palette: themePalette(themeOption),
        // mixins: {
        //     toolbar: {
        //         minHeight: "48px",
        //         padding: "16px",
        //         "@media (min-width: 600px)": {
        //             minHeight: "48px"
        //         }
        //     }
        // },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
