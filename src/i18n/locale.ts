import * as path from "path";

export const localeOptions: i18n.ConfigurationOptions = {
    locales: ["el", "en"],
    defaultLocale: "en",
    cookie: "lang",
    fallbacks: {
        "el": "en"
    },
    directory: path.join(__dirname, "/locales")
};
