import './styles.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {ErrorMessage} from '../../components/Error/Error'
import {Typography} from '../../components/Typography/Typography'
import {handleLocaleClick} from '../../helpers/handleLocale'
import {useLocalization} from '../../hooks/useLocalization'
import {state} from '../../state/state'

export const LoginScreen = () => {
  const navigate = useNavigate()

  // set locale
  const context = useLocalization()
  const [locale, setLocale] = useState(state.locale || 'en')
  const localeValues = context[`${locale}`]

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

  const handleSubmit = e => {
    e.preventDefault()

    // TODO: change values on requested data
    if (username === 'username' && password === '1111') {
      setError('')
      navigate('/private-notes')
    } else {
      setError('Invalid username or password!')
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
            onClick={e => handleLocaleClick(e, setLocale)}
            text={'en'}
          />
          <Button
            buttonClass={locale === 'ru' ? 'ru active' : 'ru'}
            onClick={e => handleLocaleClick(e, setLocale)}
            text={'ru'}
          />
        </div>
      </form>
    </div>
  )
}
