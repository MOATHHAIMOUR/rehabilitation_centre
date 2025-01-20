import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";
import { Translation } from "./locales/Translation";

// Strongly type the resources object
const resources: Record<string, { translation: Translation }> = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

// Function to dynamically set direction
const setDirection = (lng: string) => {
  const htmlElement = document.documentElement;
  if (lng === "ar") {
    htmlElement.setAttribute("dir", "rtl");
    htmlElement.setAttribute("lang", "ar");
  } else {
    htmlElement.setAttribute("dir", "ltr");
    htmlElement.setAttribute("lang", "en");
  }
};

i18n
  .use(initReactI18next) // Initialize i18next with React
  .init({
    resources,
    fallbackLng: "ar", // Fallback language
    debug: true, // Enable debugging
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
  });

// Set initial direction based on the default language
setDirection(i18n.language);

// Update direction dynamically on language change
i18n.on("languageChanged", (lng) => {
  setDirection(lng);
});

export default i18n;
