import './styles.css'

export const Button = ({buttonName, type, disabled}) => {
  return (
    <button className={buttonName} type={type} disabled={disabled}>
      {buttonName}
    </button>
  )
}
