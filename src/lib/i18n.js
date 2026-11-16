import { en } from './i18n-en'

// Bahasa Indonesia is the app's source language: every user-facing string is
// written in Indonesian in the code and passed through t(). The Indonesian
// text itself is the lookup key, so
//   - the code still reads in Indonesian, as it always has,
//   - Indonesian needs no dictionary at all, and
//   - a string nobody has translated yet just shows in Indonesian instead of
//     showing a raw key.
// English lives in i18n-en.js. Placeholders are {name}-style:
//   t('Promo berlaku untuk {count} layanan', { count: 3 })

export const LANGUAGES = ['id', 'en']
export const DEFAULT_LANGUAGE = 'id'
export const LANGUAGE_STORAGE_KEY = 'kuorza-language'

const dictionaries = { en }

// Module-level copy of the current language, kept in sync by
// LanguageProvider. It lets plain modules (date formatting, CSV/PDF exports,
// API error messages) translate without a hook. Components should still use
// useLanguage() so they re-render when the language changes.
let currentLanguage = readStoredLanguage()

export function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function getLanguage() {
  return currentLanguage
}

export function setCurrentLanguage(language) {
  currentLanguage = LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE
}

function interpolate(text, vars) {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match))
}

export function translate(text, vars, language = currentLanguage) {
  if (text == null) return text
  const dictionary = dictionaries[language]
  const translated = dictionary?.[text] ?? text
  return interpolate(translated, vars)
}

// Locale for dates and times. Money is deliberately NOT localized — Rupiah is
// always shown as "Rp 15.000" (see formatRupiah), whatever the UI language.
export function dateLocale(language = currentLanguage) {
  return language === 'en' ? 'en-GB' : 'id-ID'
}
