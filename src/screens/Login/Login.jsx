import './styles.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {ErrorMessage} from '../../components/Error/Error'
import {Typography} from '../../components/Typography/Typography'
import {useLocalization} from '../../hooks/useLocalization'
import {withLogger} from '../../hoc/withLogger'
import {setUser, setPassword, setError} from '../../Redux/slices/userSlice'
import {authorizeUser} from '../../Redux/thunks/loginThunk'
import {Loading} from '../Loading/Loading'
import {ROUTES} from '../../constants/constants'

const LoginScreen = () => {
  const {username, password, isLoading, error} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get locale, values for elements with text and handle function for locale state
  const {locale, localeValues, handleLocaleChange} = useLocalization()

  // handlers for username, password and login button
  const handleUsernameChange = e => {
    const value = e.target.value
    dispatch(setUser(value))
    dispatch(setError(''))
  }

  const handlePasswordChange = e => {
    const value = e.target.value
    dispatch(setPassword(value))
    dispatch(setError(''))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const result = await dispatch(authorizeUser({username, password}))
      if (result) navigate(ROUTES.PRIVATE_NOTES)
    } catch (err) {
      dispatch(setError(err))
    }
  }

  return (
    <div className="screen__login">
      <Typography type={'h1'}>{localeValues.logo}</Typography>
      <form onSubmit={handleSubmit}>
        <Typography type={'h2'}>{localeValues.greeting}</Typography>
        <div>
          <Input inputType="username" onChange={handleUsernameChange} />
          <Input inputType="password" onChange={handlePasswordChange} />
        </div>
        {error && <ErrorMessage message={localeValues.errorInvalid} />}
        <Button buttonClass="submit" type="submit" disabled={!!error} text={localeValues.submit} />
        <div className="login__localization">
          <Button
            buttonClass={locale === 'en' ? 'en active' : 'en'}
            onClick={e => {
              e.preventDefault()
              handleLocaleChange('en')
            }}
            text={'en'}
          />
          <Button
            buttonClass={locale === 'ru' ? 'ru active' : 'ru'}
            onClick={e => {
              e.preventDefault()
              handleLocaleChange('ru')
            }}
            text={'ru'}
          />
        </div>
      </form>
      {isLoading && <Loading />}
    </div>
  )
}

export const ProtectedLoginScreen = withLogger(LoginScreen)
