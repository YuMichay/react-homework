import './styles.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {ErrorMessage} from '../../components/Error/Error'
import {Typography} from '../../components/Typography/Typography'
import {useLocalization} from '../../hooks/useLocalization'
import {state} from '../../state/state'
import {getJSON} from '../../helpers/getJSON'
import {withLogger} from '../../hoc/withLogger'

const LoginScreen = () => {
  const navigate = useNavigate()

  // get locale, values for elements with text and handle function for locale state
  const {locale, localeValues, handleLocaleChange} = useLocalization()

  // states for error, username and password
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // handlers for username, password and login button
  const handleUsernameChange = e => {
    const value = e.target.value
    setUsername(value)
    state.username = value
    setError('')
  }

  const handlePasswordChange = e => {
    const value = e.target.value
    setPassword(value)
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const token = await getJSON(username, password)
      if (token) {
        setError('')
        navigate('/private-notes')
        state.isAuthorized = true
        localStorage.setItem('token', token)
      } else {
        setError('Invalid username or password!')
        state.isAuthorized = false
      }
    } catch (err) {
      setError('Authentication failed: ', err)
      state.isAuthorized = false
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
            onClick={() => handleLocaleChange('en')}
            text={'en'}
          />
          <Button
            buttonClass={locale === 'ru' ? 'ru active' : 'ru'}
            onClick={() => handleLocaleChange('ru')}
            text={'ru'}
          />
        </div>
      </form>
    </div>
  )
}

export const ProtectedLoginScreen = withLogger(LoginScreen)
