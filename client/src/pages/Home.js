import { useState, useContext, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { API } from '../config/api'
import { UserContext } from '../context/userContext';

import Loading from '../components/spinner/Loading';
import Header from '../components/base/Header';
import Main from '../components/base/Main';

const Home = ({ activateMusicPlayer }) => {
  const [state, dispatch] = useContext(UserContext)
  const [musics, setMusics] = useState(false)
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegist, setModalRegist] = useState(false);
  const [redirect, setRedirect] = useState(false)

  const loginModalToggle = (e) => {
    setModalLogin(!modalLogin)
  }

  const registModalToggle = (e) => {
    setModalRegist(!modalRegist)
  }

  const switchModalToggle = () => {
    setModalLogin(!modalLogin)
    setModalRegist(!modalRegist)
  }

  const openMusicPlayer = async (index) => {
    try {
      if (!state.isLogin) return loginModalToggle()

      const response = await API.get('/check-user-subscription')
      const subscription = response.data.data.user.subscribe

      if (subscription === 'false') return setRedirect(true)

      activateMusicPlayer(true, index, musics)
    } catch (error) {
      alert(error)
    }
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
      activateMusicPlayer(false) // Close music player when logout
    }
  }, [state.isLogin])

  return redirect ? (
    <Redirect to='/payment' />
  ) : (
    <div>
      <Header
        modalLogin={modalLogin}
        modalRegist={modalRegist}
        loginModalToggle={loginModalToggle}
        registModalToggle={registModalToggle}
        switchModalToggle={switchModalToggle}
      />
      {!musics ? (
        <div className="center">
          <Loading type='bars' size='5%' />
        </div>
      ) : <Main openMusicPlayer={openMusicPlayer} musics={musics} />}
    </div>
  )
}

export default Home
