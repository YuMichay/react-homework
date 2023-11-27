import './styles.css'
import {useRouteError} from 'react-router-dom'
import {useLocalization} from '../../hooks/useLocalization'
import {Typography} from '../Typography/Typography'

export default function ErrorPage() {
  // get locale values for elements with text
  const {localeValues} = useLocalization()

  const error = useRouteError()

  return (
    <div id="error-page">
      <Typography type={'h1'} className="error__header">
        {localeValues.errorPageHeader}
      </Typography>
      <Typography type={'p'} className="error__message">
        {localeValues.errorPageMessage}
      </Typography>
      <Typography type={'p'}>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </div>
  )
}
