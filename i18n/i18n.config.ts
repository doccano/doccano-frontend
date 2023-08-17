import de from './de/index.js'
import en from './en/index.js'
import fr from './fr/index.js'
import zh from './zh/index.js'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    de,
    en,
    fr,
    zh
  }
}))
