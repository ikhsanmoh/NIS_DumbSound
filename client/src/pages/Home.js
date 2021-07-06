import { useState, useContext } from 'react'
import { UserContext } from '../context/userContext';

import Header from '../components/base/Header';
import Main from '../components/base/Main';

const Home = () => {
  const [state, dispatch] = useContext(UserContext)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  const openMusicPlayer = () => {
    if (!state.isLogin) {
      return alert('Login First!')
    }

    setShowMusicPlayer(true)
  }

  return (
    <div>
      <Header />
      <Main openMusicPlayer={openMusicPlayer} />
    </div>
  )
}

export default Home
