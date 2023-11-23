import './styles.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Typography} from '../../components/Typography/Typography'
import {mockNotes} from '../../mocks/mockData'
import {Note} from '../../components/Note/Note'
import {Button} from '../../components/Button/Button'
import {CreateNoteModal} from '../../components/Modals/Create/CreateModal'
import {useLocalization} from '../../hooks/useLocalization'
import {handleLocaleClick} from '../../helpers/handleLocale'
import {state} from '../../state/state'

export const PrivateNotes = () => {
  // set locale
  const localeFromState = state.locale
  const context = useLocalization()
  const [locale, setLocale] = useState(localeFromState)
  const localeValues = context[`${locale}`]

  // TODO: change on requested data
  const privateNotes = mockNotes.filter(note => !note.isPublic)

  const navigate = useNavigate()
  // handle click on "public" link
  const handleClick = () => {
    navigate('/public-notes')
  }

  // handle click on logout icon in header
  const handleLogout = () => {
    navigate('/')
  }

  // CREATE MODAL: handle click on add button
  const [showCreateModal, setShowCreateModal] = useState(false)
  const handleCreateNote = () => {
    setShowCreateModal(!showCreateModal)
  }

  return (
    <div className="screen__notes">
      <div className="notes__header">
        <Typography type={'h1'}>{localeValues.logo}</Typography>
        <Button buttonClass={'logout'} type={'button'} onClick={handleLogout} />
      </div>
      <div className="notes__aside">
        <Button
          buttonClass={'public'}
          type={'button'}
          onClick={handleClick}
          text={localeValues.public}
        />
      </div>
      <div className="notes__wrapper">
        {privateNotes.map(note => (
          <Note
            key={note.id}
            color={note.color}
            isPublic={note.isPublic}
            owner={note.owner}
            tags={note.tags}
            text={note.text}
            title={note.title}
            id={note.id}
            localeValues={localeValues}
          />
        ))}
        <Button buttonClass={'add'} type={'button'} onClick={handleCreateNote} />
      </div>
      <div className="note__localization">
        <Button
          buttonClass={locale === 'en' ? 'en active' : 'en'}
          onClick={e => handleLocaleClick(e, setLocale)}
          text={'en'}
        />
        <Button
          buttonClass={locale === 'ru' ? 'ru active' : 'ru'}
          onClick={e => handleLocaleClick(e, setLocale)}
          text={'ru'}
        />
      </div>
      {showCreateModal && (
        <CreateNoteModal setModalState={setShowCreateModal} localeValues={localeValues} />
      )}
    </div>
  )
}
