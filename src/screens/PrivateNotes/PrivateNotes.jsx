import './styles.css'
import {ToastContainer} from 'react-toastify'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Note} from '../../components/Note/Note'
import {Button} from '../../components/Button/Button'
import {CreateNoteModal} from '../../components/Modals/CreateModal/CreateModal'
import {getPrivateNotes} from '../../Redux/thunks/privateNotesThunk'
import {LoadingScreen} from '../Loading/Loading'

export const PrivateNotes = () => {
  const {token} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const {notes, isLoading, isUpdated} = useSelector(state => state.privateNotes)

  useEffect(() => {
    if (!isUpdated) dispatch(getPrivateNotes({token: token}))
  }, [dispatch, isUpdated, token])

  // CREATE MODAL: handle click on add button
  const [showCreateModal, setShowCreateModal] = useState(false)
  const handleCreateNote = () => {
    setShowCreateModal(!showCreateModal)
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="notes__wrapper">
        <ToastContainer autoClose={3000} />
        {notes.length ? (
          <>
            {notes.map(note => (
              <Note key={note.id} note={note} />
            ))}
            <Button buttonClass={'add'} type={'button'} onClick={handleCreateNote} />
          </>
        ) : (
          ''
        )}
      </div>
      {showCreateModal && <CreateNoteModal setModalState={setShowCreateModal} />}
    </>
  )
}
