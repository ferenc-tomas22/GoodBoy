import i18n from 'i18next'
import translation from './sk/translation.json'
import { initReactI18next } from 'react-i18next'

export const resources = { sk: { translation } } as const
i18n.use(initReactI18next).init({ lng: 'sk', resources })
