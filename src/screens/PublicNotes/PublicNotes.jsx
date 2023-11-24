import './styles.css'
import {useNavigate} from 'react-router-dom'
import {Typography} from '../../components/Typography/Typography'
import {Button} from '../../components/Button/Button'
import {mockNotes} from '../../mocks/mockData'
import {Note} from '../../components/Note/Note'
import {useLocalization} from '../../hooks/useLocalization'

export const PublicNotes = () => {
  // get locale, values for elements with text and handle function for locale state
  const {locale, localeValues, handleLocaleChange} = useLocalization()

  // TODO: change on requested data
  const publicNotes = mockNotes.filter(note => note.isPublic)

  const navigate = useNavigate()

  // return to notes
  const handleClick = () => {
    navigate('/private-notes')
  }

  // handle click on logout icon
  const handleLogout = () => {
    navigate('/')
  }
  return (
    <div className="screen__notes">
      <div className="notes__header">
        <Typography type={'h1'}>{localeValues.logo}</Typography>
        <Button buttonClass={'logout'} type={'button'} onClick={handleLogout} />
      </div>
      <div className="notes__aside">
        <Button
          buttonClass={'private'}
          type={'button'}
          onClick={handleClick}
          text={localeValues.private}
        />
      </div>
      <div className="notes__wrapper">
        {publicNotes.length
          ? publicNotes.map(note => (
              <Note
                key={note.id}
                color={note.color}
                isPublic={note.isPublic}
                owner={note.owner}
                tags={note.tags}
                text={note.text}
                title={note.title}
                localeValues={localeValues}
              />
            ))
          : ''}
      </div>
      <div className="note__localization">
        <Button
          buttonClass={locale === 'en' ? 'en active' : 'en'}
          onClick={() => handleLocaleChange('en')}
          text={'en'}
        />
        <Button
          buttonClass={locale === 'ru' ? 'ru active' : 'ru'}
          onClick={() => handleLocaleChange('ru')}
          text={'ru'}
        />
      </div>
    </div>
  )
}
