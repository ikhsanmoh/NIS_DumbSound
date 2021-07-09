import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext'

import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import Navbar from '../navigation/Navbar';

import './TransparantHeader.css'

const TrasparantHeader = () => {
  const [state, dispatch] = useContext(UserContext)
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegist, setModalRegist] = useState(false);

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

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }

  return (
    <>
      <header className='transparant-header'>
        <Navbar
          loginModalToggle={loginModalToggle}
          registModalToggle={registModalToggle}
          logout={logout}
        />
      </header>
      <LoginModal switchModal={switchModalToggle} modalStat={modalLogin} modalClose={loginModalToggle} />
      <RegistrationModal switchModal={switchModalToggle} modalStat={modalRegist} modalClose={registModalToggle} />
    </>
  )
}

export default TrasparantHeader
