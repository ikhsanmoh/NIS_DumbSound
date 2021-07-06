import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import { API } from '../config/api'


import Header from '../components/base/Header';
import Main from '../components/base/Main';
// import MusicPlayer from '../components/player/MusicPlayer';

const Home = () => {
  const [state, dispatch] = useContext(UserContext)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const [musics, setMusics] = useState(false)

  const openMusicPlayer = () => {
    if (!state.isLogin) {
      return alert('Login First!')
    }

    setShowMusicPlayer(true)
  }

  const loadMusics = async () => {
    try {
      const SUCCESS = 200
      // const loggedInUserId = state.user.id

      const response = await API.get('/musics')

      if (response.status === SUCCESS) {
        const musicList = response.data.data
        setMusics(musicList)
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    loadMusics()
  }, [])

  return (
    <div>
      <Header />
      <Main openMusicPlayer={openMusicPlayer} musics={musics} />
    </div>
  )
}

export default Home
