import {createContext, useContext} from 'react'
import {en} from '../localization/en'
import {ru} from '../localization/ru'
import {useDispatch, useSelector} from 'react-redux'
import {change} from '../Redux/slices/appSlice'

const locales = {
  en,
  ru,
}

const LocalizationContext = createContext(locales)

export const useLocalization = () => {
  const locale = useSelector(state => state.app.locale)
  const dispatch = useDispatch()
  const context = useContext(LocalizationContext)

  const handleLocaleChange = newLocale => {
    dispatch(change(newLocale))
  }

  return {locale, localeValues: context[locale], handleLocaleChange}
}
