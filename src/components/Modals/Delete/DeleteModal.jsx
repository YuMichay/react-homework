import './styles.css'
import {Typography} from '../../Typography/Typography'
import {Button} from '../../Button/Button'

export const DeleteNoteModal = ({setModalState, localeValues}) => {
  // handle overlay and cancel click
  const handleCancelClick = () => {
    setModalState(false)
  }

  const handleConfirmClick = () => {
    setModalState(false)
    console.log('Note is deleted')
  }

  return (
    <div className="delete__wrapper">
      <div className="overlay" onClick={handleCancelClick}></div>
      <div className="delete__modal">
        <Typography type={'h2'}>{localeValues.deleteMessage}</Typography>
        <div className="delete__buttons">
          <Button
            buttonClass={'cancel'}
            type={'button'}
            onClick={handleCancelClick}
            text={localeValues.cancel}
          />
          <Button
            buttonClass={'confirm'}
            type={'button'}
            onClick={handleConfirmClick}
            text={localeValues.confirm}
          />
        </div>
      </div>
    </div>
  )
}