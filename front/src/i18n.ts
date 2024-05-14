import { createInstance } from "i18next";

import I18NextHttpBackend from "i18next-http-backend";

export const i18nInstance = createInstance({
  fallbackLng: "ru",
  defaultNS: "translations",
  ns: ["translations"],
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: "/locales/{{ns}}/{{lng}}.json",
  },
});

i18nInstance.use(I18NextHttpBackend).init();
