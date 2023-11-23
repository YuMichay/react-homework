import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {LoginScreen} from './screens/Login/Login'
import {PrivateNotes} from './screens/PrivateNotes/PrivateNotes'
import {PublicNotes} from './screens/PublicNotes/PublicNotes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<LoginScreen />}></Route>
        <Route path={'/private-notes'} element={<PrivateNotes />}></Route>
        <Route path={'/public-notes'} element={<PublicNotes />}></Route>
      </Routes>
    </Router>
  )
}

export default App
