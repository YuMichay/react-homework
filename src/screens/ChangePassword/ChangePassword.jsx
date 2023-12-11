import './styles.css'
import {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {validatePassword} from '../../helpers/validateInput'
import {ErrorMessage} from '../../components/Error/Error'
import {useOutletContext} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {changePassword} from '../../Redux/thunks/changePasswordThunk'

export const ChangePassword = () => {
  // get values for elements with text in locale state
  const localeValues = useOutletContext()

  const dispatch = useDispatch()
  const {password, error, token} = useSelector(state => state.user)
  const [newPassword, setNewPassword] = useState('')

  const notify = () => toast.success(localeValues.changedPasswordMessage)
  const err = () => toast.error(localeValues.errorPassword)
  const errResponse = () => toast.error(localeValues.errorNote)

  const handlePasswordChange = e => {
    const value = e.target.value
    setNewPassword(value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const oldPassword = password
    const isValid = validatePassword(newPassword)

    if (isValid && newPassword !== oldPassword) {
      const result = await dispatch(changePassword({newPassword, token}))
      if (result) {
        notify()
      }
    } else if (!isValid) {
      err()
    } else {
      errResponse()
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
