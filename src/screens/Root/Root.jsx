import './styles.css'
import {useEffect} from 'react'
import {useNavigate, useMatch, Outlet, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useLocalization} from '../../hooks/useLocalization'
import {Typography} from '../../components/Typography/Typography'
import {Button} from '../../components/Button/Button'
import {withLogger} from '../../hoc/withLogger'
import {authorize} from '../../Redux/slices/userSlice'
import {clear} from '../../Redux/slices/publicNotesSlice'
import {
  CHANGE_PASSWORD,
  FAVORITE,
  LOGIN,
  PRIVATE_NOTES,
  PUBLIC_NOTES,
} from '../../constants/constants'

const Root = () => {
  const isAuthorized = useSelector(state => state.user.isAuthorized)
  const dispatch = useDispatch()

  // get locale, values for elements with text and handle function for locale state
  const {locale, localeValues, handleLocaleChange} = useLocalization()

  const navigate = useNavigate()

  const navPrivate = useMatch(PRIVATE_NOTES)
  const navPublic = useMatch(PUBLIC_NOTES)
  const navFavorite = useMatch(`${PUBLIC_NOTES}/${FAVORITE}`)
  const navPassword = useMatch(CHANGE_PASSWORD)

  // handle click on logout icon in header
  const handleLogout = () => {
    navigate(LOGIN)
    dispatch(authorize(false))
    dispatch(clear())
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (!isAuthorized) {
      navigate(LOGIN)
    }
  }, [isAuthorized, navigate])

  return (
    <div className="screen__notes">
      <div className="notes__header">
        <Typography type={'h1'}>{localeValues.logo}</Typography>
        <Button buttonClass={'logout'} type={'button'} onClick={handleLogout} />
      </div>
      <div className="notes__navigation">
        <Link to={PRIVATE_NOTES} className={navPrivate ? 'private active' : 'private'}>
          {localeValues.private}
        </Link>
        <Link to={PUBLIC_NOTES} className={navPublic ? 'public active' : 'public'}>
          {localeValues.public}
        </Link>
        {(navPublic || navFavorite) && (
          <Link
            to={`${PUBLIC_NOTES}/${FAVORITE}`}
            className={navFavorite ? 'favorite active' : 'favorite'}>
            {localeValues.favorite}
          </Link>
        )}
        <Link
          to={CHANGE_PASSWORD}
          className={navPassword ? 'change-password active' : 'change-password'}>
          {localeValues.changePasswordScreen}
        </Link>
      </div>
      <Outlet context={localeValues} />
      <div className="note__localization">
        <Button
          buttonClass={locale === 'en' ? 'en active' : 'en'}
          onClick={() => handleLocaleChange('en')}
          text={'en'}
        />
        <Button
          buttonClass={locale === 'ru' ? 'ru active' : 'ru'}
          onClick={() => handleLocaleChange('ru')}
          text={'ru'}
        />
      </div>
    </div>
  )
}

export const ProtectedRoot = withLogger(Root)
