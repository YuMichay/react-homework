import './styles.css'
import userLogo from '../../assets/user.svg'
import passwordHiddenLogo from '../../assets/eye-off.svg'
import passwordShownLogo from '../../assets/eye.svg'
import {useState} from 'react'

export const Input = ({inputType, onChange}) => {
  const [isHidden, setisHidden] = useState(true)

  const togglePasswordVisibility = () => {
    setisHidden(!isHidden)
  }

  return (
    <label className="header">
      <input
        className={inputType}
        type={inputType === 'password' && isHidden ? 'password' : 'text'}
        placeholder={inputType}
        required
        onChange={onChange}
      />
      <img
        className={'icon ' + 'icon--' + inputType}
        src={
          inputType === 'username' ? userLogo : isHidden ? passwordHiddenLogo : passwordShownLogo
        }
        alt={inputType}
        onClick={inputType === 'password' ? togglePasswordVisibility : null}
      />
    </label>
  )
}
