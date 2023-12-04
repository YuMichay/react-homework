import './styles.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {validatePassword} from '../../helpers/validateInput'
import {ErrorMessage} from '../../components/Error/Error'
import {useOutletContext} from 'react-router-dom'
import {useSelector} from 'react-redux'
// import {setPassword, setError} from '../../Redux/slices/userSlice'

export const ChangePassword = () => {
  // get values for elements with text ain locale state
  const localeValues = useOutletContext()
  const {password, error} = useSelector(state => state.user)
  // const dispatch = useDispatch()

  const notify = () => toast.success(localeValues.changedPasswordMessage)

  // TODO: send request with data
  const handlePasswordChange = e => {
    const value = e.target.value
    // dispatch(setPassword(value))
    // dispatch(setError(''))
    console.log(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: get real password
    const oldPassword = '275hdfvkudHw1275'
    const newPassword = password
    const isValid = validatePassword(newPassword)

    if (isValid && newPassword !== oldPassword) {
      // dispatch(setError(''))
      notify()
    } else {
      // dispatch(setError(localeValues.errorPassword))
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
