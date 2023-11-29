import './styles.css'
import {useEffect} from 'react'
import {useNavigate, useMatch, Outlet, Link} from 'react-router-dom'
import {state} from '../../state/state'
import {useLocalization} from '../../hooks/useLocalization'
import {Typography} from '../../components/Typography/Typography'
import {Button} from '../../components/Button/Button'
import {withLogger} from '../../hoc/withLogger'

const Root = () => {
  // get locale, values for elements with text and handle function for locale state
  const {locale, localeValues, handleLocaleChange} = useLocalization()

  const navigate = useNavigate()

  const navPrivate = useMatch('/private-notes')
  const navPublic = useMatch('/public-notes')
  const navFavorite = useMatch('/public-notes/favorite')
  const navPassword = useMatch('/password')

  // handle click on logout icon in header
  const handleLogout = () => {
    navigate('/login')
    state.isAuthorized = false
    state.user = ''
    state.favoriteNotesIds = []
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (!state.isAuthorized) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="screen__notes">
      <div className="notes__header">
        <Typography type={'h1'}>{localeValues.logo}</Typography>
        <Button buttonClass={'logout'} type={'button'} onClick={handleLogout} />
      </div>
      <div className="notes__navigation">
        <Link to={'/private-notes'} className={navPrivate ? 'private active' : 'private'}>
          {localeValues.private}
        </Link>
        <Link to={'/public-notes'} className={navPublic ? 'public active' : 'public'}>
          {localeValues.public}
        </Link>
        {(navPublic || navFavorite) && (
          <Link
            to={'/public-notes/favorite'}
            className={navFavorite ? 'favorite active' : 'favorite'}>
            {localeValues.favorite}
          </Link>
        )}
        <Link to="/password" className={navPassword ? 'change-password active' : 'change-password'}>
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
