import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { $locale } from '@app/stores/state';

// Import combined translations for each supported locale
import enTranslations from './en';
import ruTranslations from './ru';
// Add more imports for other supported languages

const resources = {
  en: enTranslations,
  ru: ruTranslations,
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: $locale.get(), // Use the current value from $locale
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

// Update i18n language when $locale changes
$locale.subscribe((newLocale) => {
  i18n.changeLanguage(newLocale);
});

export default i18n;

