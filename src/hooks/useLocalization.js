import {createContext, useContext, useState} from 'react'
import {en} from '../localization/en'
import {ru} from '../localization/ru'
import {state} from '../state/state'

const locales = {
  en,
  ru,
}

const LocalizationContext = createContext(locales)

export const useLocalization = () => {
  const context = useContext(LocalizationContext)
  const [locale, setLocale] = useState(state.locale || 'en')

  const handleLocaleChange = newLocale => {
    setLocale(newLocale)
    state.locale = newLocale
  }

  return {locale, localeValues: context[locale], handleLocaleChange}
}
