import './styles.css'
import {useDispatch} from 'react-redux'
import {Typography} from '../../Typography/Typography'
import {Button} from '../../Button/Button'
import {useLocalization} from '../../../hooks/useLocalization'
import {remove} from '../../../Redux/slices/privateNotesSlice'

export const DeleteNoteModal = ({setModalState}) => {
  const dispatch = useDispatch()
  // get values for elements with text
  const {localeValues} = useLocalization()

  // handle overlay and cancel click
  const handleCancelClick = () => {
    setModalState(false)
  }

  const handleConfirmClick = () => {
    setModalState(false)
    dispatch(remove())
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
