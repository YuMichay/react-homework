import './styles.css'
import {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {validatePassword} from '../../helpers/validateInput'
import {ErrorMessage} from '../../components/Error/Error'
import {useOutletContext} from 'react-router-dom'

export const ChangePassword = () => {
  // get locale, values for elements with text and handle function for locale state
  const localeValues = useOutletContext()

  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const notify = () => toast.success(localeValues.changedPasswordMessage)

  // TODO: send request with data
  const handlePasswordChange = e => {
    const value = e.target.value
    setPassword(value)
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: get real password
    const oldPassword = '275hdfvkudHw1275'
    const newPassword = password
    const isValid = validatePassword(newPassword)

    if (isValid && newPassword !== oldPassword) {
      setError('')
      notify()
    } else {
      setError(localeValues.errorPassword)
    }
  }

  return (
    <div className="screen__password">
      <form onSubmit={handleSubmit}>
        <Input
          inputType={'text'}
          placeholder={localeValues.newPassword}
          onChange={handlePasswordChange}
        />
        {error && <ErrorMessage message={error} />}
        <Button buttonClass={'submit'} type={'submit'} text={localeValues.submit} />
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  )
}
