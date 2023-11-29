import {URL} from '../constants/constants'

export const getJSON = async (username, password) => {
  const request = await fetch(`${URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  })
  if (request.ok) {
    const json = await request.json()
    return await json.token
  }
}
