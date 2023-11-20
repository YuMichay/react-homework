import {useState} from 'react'
import {Button} from '../../components/Button'
import {Input} from '../../components/Input'
import './styles.css'
import {ErrorMessage} from '../../components/Error'
import {Typography} from '../../components/Typography'

export const LoginScreen = () => {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // handlers for username, password and login button
  const handleUsernameChange = e => {
    const value = e.target.value
    setUsername(value)
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
      console.log('Success!')
      setError('')
    } else {
      setError('Invalid username or password!')
    }
  }
  return (
    <div className="screen__login">
      <Typography type={'h1'}>Notes</Typography>
      <form onSubmit={handleSubmit}>
        <Typography type={'h4'}>Hello!</Typography>
        <div>
          <Input inputType="username" onChange={handleUsernameChange} />
          <Input inputType="password" onChange={handlePasswordChange} />
        </div>
        {error && <ErrorMessage message={error} />}
        <Button buttonName="submit" type="submit" disabled={!!error} />
      </form>
    </div>
  )
}
