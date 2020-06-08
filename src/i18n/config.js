import i18n from "i18next"
import { reactI18nextModule } from "react-i18next"

import translationEN from '../locales/en/translation.json'
import translationHi from '../locales/hi/translation.json'
import i18next from 'i18next'

i18next.init({
    fallbackLng: 'en',
    resources: {
        hi: {
            translations: translationHi
        },
        en: {
            translations: translationEN
        }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    react: {
        wait: true,
    },
})

i18next.languages = ['hi', 'en']

export default i18next