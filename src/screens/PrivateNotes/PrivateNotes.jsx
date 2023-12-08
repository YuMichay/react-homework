import './styles.css'
import {useState} from 'react'
import {Note} from '../../components/Note/Note'
import {Button} from '../../components/Button/Button'
import {CreateNoteModal} from '../../components/Modals/CreateModal/CreateModal'
import {useSelector} from 'react-redux'

export const PrivateNotes = () => {
  const privateNotes = useSelector(state => state.privateNotes.notes)

  // CREATE MODAL: handle click on add button
  const [showCreateModal, setShowCreateModal] = useState(false)
  const handleCreateNote = () => {
    setShowCreateModal(!showCreateModal)
  }

  return (
    <>
      <div className="notes__wrapper">
        {privateNotes.length
          ? privateNotes.map(note => (
              <Note
                key={note.id}
                color={note.color}
                isPublic={note.isPublic}
                owner={note.owner}
                tags={note.tags}
                text={note.text}
                title={note.title}
                id={note.id}
              />
            ))
          : ''}
        <Button buttonClass={'add'} type={'button'} onClick={handleCreateNote} />
      </div>
      {showCreateModal && <CreateNoteModal setModalState={setShowCreateModal} />}
    </>
  )
}
