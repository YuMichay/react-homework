import './styles.css'

export const Button = ({buttonClass, type, disabled = false, text = '', onClick = null}) => {
  return (
    <button className={buttonClass} type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
}
