import './styles.css'
import {useState} from 'react'
import {ChromePicker} from 'react-color'
import publicNote from '../../../assets/unlock.svg'
import privateNote from '../../../assets/lock.svg'
import {Typography} from '../../Typography/Typography'
import {Input} from '../../Input/Input'
import {generateId} from '../../../helpers/generateId'
import {validateTags} from '../../../helpers/validateInput'
import {Button} from '../../Button/Button'
import {ErrorMessage} from '../../Error/Error'
import {useLocalization} from '../../../hooks/useLocalization'

export const CreateNoteModal = ({setModalState, values = {}}) => {
  const [error, setError] = useState('')

  // get values for elements with text
  const {localeValues} = useLocalization()

  // create all the values
  const [color, setColor] = useState(values.color || '#ffffff')
  const [isPublic, setIsPublic] = useState(values.isPublic || false)
  const [tags, setTags] = useState(values.tags || [])
  const [text, setText] = useState(values.text || '')
  const [title, setTitle] = useState(values.title || '')

  // handle color changing
  const handleChange = color => {
    setColor(color.hex)
  }

  // handle click on private/public icon
  const handleClick = () => {
    setIsPublic(!isPublic)
  }

  // set note title
  const handleTitleChange = e => {
    const value = e.target.value
    setTitle(value)
  }

  // set note text
  const handleTextChange = e => {
    const value = e.target.value
    setText(value)
  }

  // set note tags
  const handleTagsChange = e => {
    const value = e.target.value
    const validation = validateTags(value)
    if (!validation) setError('Please check the format!')
    else setError('')
    setTags(value)
  }

  // TODO: add API request to add data and actual username
  // create note data
  const handleSubmit = e => {
    e.preventDefault()
    const newNoteId = values.id || generateId()
    const newNote = {
      color: color,
      isPublic: isPublic,
      owner: 'username',
      tags: tags,
      text: text,
      title: title,
      id: newNoteId,
    }
    console.log(newNote)
    setModalState(false)
  }

  // handle overlay/close click
  const handleCancelClick = () => {
    setModalState(false)
  }

  return (
    <>
      <div className="overlay" onClick={handleCancelClick}></div>
      <div className="create__modal">
        <Typography type={'h2'}>{localeValues.newNote}</Typography>
        <form onSubmit={handleSubmit}>
          <Input
            inputType={'title'}
            value={title}
            onChange={e => handleTitleChange(e)}
            placeholder={localeValues.title}
          />
          <Input
            inputType={'text'}
            value={text}
            onChange={e => handleTextChange(e)}
            placeholder={localeValues.text}
          />
          <Input
            inputType={'tags'}
            value={tags}
            onChange={e => handleTagsChange(e)}
            placeholder={localeValues.tagsFormat}
          />
          {error && <ErrorMessage message={localeValues.errorTags} />}
          <div className="create__type">
            <Typography type={'p'}>
              {isPublic ? localeValues.public : localeValues.private}
            </Typography>
            <img src={isPublic ? publicNote : privateNote} alt="lock" onClick={handleClick}></img>
          </div>
          <ChromePicker width={'180px'} color={color} onChange={handleChange} />
          <Button buttonClass={'submit'} type={'submit'} text={localeValues.submit} />
        </form>
      </div>
    </>
  )
}
