import {createContext, useContext} from 'react'
import {en} from '../localization/en'
import {ru} from '../localization/ru'

const locales = {
  en,
  ru,
}

const LocalizationContext = createContext(locales)

export const useLocalization = () => {
  const context = useContext(LocalizationContext)
  return context
}
