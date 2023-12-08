import './styles.css'
import {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {validatePassword} from '../../helpers/validateInput'
import {ErrorMessage} from '../../components/Error/Error'
import {useOutletContext} from 'react-router-dom'
import {useSelector} from 'react-redux'

export const ChangePassword = () => {
  // get values for elements with text in locale state
  const localeValues = useOutletContext()

  const {password, error} = useSelector(state => state.user)
  const [newPassword, setNewPassword] = useState('')

  const notify = () => toast.success(localeValues.changedPasswordMessage)

  const handlePasswordChange = e => {
    const value = e.target.value
    setNewPassword(value)
    console.log(value)
  }

  // TODO: send request with data
  const handleSubmit = e => {
    e.preventDefault()
    const oldPassword = password
    const isValid = validatePassword(newPassword)

    if (isValid && newPassword !== oldPassword) {
      notify()
    } else {
      console.log(localeValues.errorPassword)
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
