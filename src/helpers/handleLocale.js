import {state} from '../state/state'

export const handleLocaleClick = (e, callback) => {
  e.preventDefault()

  callback(e.target.textContent)
  state.locale = e.target.textContent
}
