import "i18next";
import { Translation } from "./locales/Translation"; // Adjust the path if needed

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"; // Your default namespace
    resources: {
      translation: Translation; // Ensure this matches your translation type
    };
  }
}
