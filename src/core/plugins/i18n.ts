import { createI18n } from 'vue-i18n'
/**
 * messages are generated using vite-plugin-i18n
 * each .json files located in the ./src/locales are registered in messages
 * @see https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
 */
import messages from '@intlify/unplugin-vue-i18n/messages'
const defaultLocale = localStorage.getItem('language') || 'en'
const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    messages,
})

export default i18n