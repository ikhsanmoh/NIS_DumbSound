import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import { API } from '../config/api'

import Loading from '../components/spinner/Loading';
import Header from '../components/base/Header';
import Main from '../components/base/Main';
import MusicPlayer from '../components/player/MusicPlayer';

const Home = () => {
  const [state, dispatch] = useContext(UserContext)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const [musics, setMusics] = useState(false)
  const [currentPlay, setCurrentPlay] = useState(false)
  const [unmountMusicPlayer, setUnmountMusicPlayer] = useState(true)

  const openMusicPlayer = (index) => {
    if (!state.isLogin) {
      return alert('Login First!')
    }

    if (state.user.subscribe === 'false') return alert('You are not subscribe yet!')

    setCurrentPlay(index)
    setShowMusicPlayer(true)
  }

  const loadMusics = async () => {
    try {
      const SUCCESS = 200

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
    setTimeout(() => {
      loadMusics()
    }, 2000)
  }, [])

  useEffect(() => {
    if (!state.isLogin) {
      setShowMusicPlayer(false)
    } else {
      setUnmountMusicPlayer(false)
    }
  }, [state.isLogin])

  return (
    <div>
      <Header />
      {!musics ? (
        <div className="center">
          <Loading type='bars' size='5%' />
        </div>
      ) : <Main openMusicPlayer={openMusicPlayer} musics={musics} />}
      {showMusicPlayer &&
        musics ?
        <MusicPlayer currentIndexPlay={currentPlay} musics={musics} unmount={unmountMusicPlayer} /> : null}
    </div>
  )
}

export default Home
