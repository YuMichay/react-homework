import './styles.css'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {Typography} from '../../Typography/Typography'
import {Button} from '../../Button/Button'
import {useLocalization} from '../../../hooks/useLocalization'
import {deleteNote} from '../../../Redux/thunks/deleteNoteThunk'
import {setUpdatedStatus} from '../../../Redux/slices/privateNotesSlice'

export const DeleteNoteModal = ({setModalState}) => {
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.user)
  const {currentId} = useSelector(state => state.privateNotes)
  // get values for elements with text
  const {localeValues} = useLocalization()

  const notify = () => toast.success(localeValues.noteWasDeleted)
  const err = () => toast.error(localeValues.errorNote)

  // handle overlay and cancel click
  const handleCancelClick = () => {
    setModalState(false)
  }

  const handleConfirmClick = async () => {
    setModalState(false)
    const result = await dispatch(deleteNote({id: currentId, token: token}))
    if (result) {
      notify()
      setUpdatedStatus(false)
    } else {
      err()
    }
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
