import './styles.css'
import userLogo from '../../assets/user.svg'
import passwordHiddenLogo from '../../assets/eye-off.svg'
import passwordShownLogo from '../../assets/eye.svg'
import {useState} from 'react'

export const Input = ({inputType, value = '', onChange, placeholder = inputType}) => {
  const [isHidden, setisHidden] = useState(true)
  const [inputValue, setInputValue] = useState(value)

  // toggle password icon
  const togglePasswordVisibility = () => {
    setisHidden(!isHidden)
  }

  // handle input change
  const handleInputChange = e => {
    setInputValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <label className="input__wrapper">
      <input
        className={inputType}
        type={inputType === 'password' && isHidden ? 'password' : 'text'}
        placeholder={placeholder === 'tags' ? 'tags in format: tag, tag, tag' : placeholder}
        title={placeholder === 'tags' ? 'tags in format: tag, tag, tag' : placeholder}
        required
        value={inputValue}
        onChange={handleInputChange}
      />
      {(inputType === 'password' || inputType === 'username') && (
        <img
          className={'icon ' + 'icon--' + inputType}
          src={
            inputType === 'username'
              ? userLogo
              : inputType === 'password' && isHidden
                ? passwordHiddenLogo
                : passwordShownLogo
          }
          alt={inputType}
          onClick={inputType === 'password' ? togglePasswordVisibility : null}
        />
      )}
    </label>
  )
}
