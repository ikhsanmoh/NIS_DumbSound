import { useState } from 'react';

import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import Button from '../button/Button';

import './Header.css';

const Header = () => {
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

  const bg = {
    backgroundImage: 'url(/header-bg.png)'
  }

  return (
    <>
      <header className='header' style={bg}>
        <div className="header-top">
          <div className="logo">
            <img src="/ds-logo.png" alt="logo" />
          </div>
          <div className="option">
            <Button className="btn btn-login" text="Login" onClick={loginModalToggle} />
            <Button className="btn btn-register" text="Register" onClick={registModalToggle} />
          </div>
        </div>
        <div className="header-body">
          <div className="text">
            <h1>Connect on DumbSound</h1>
            <h3>
              Discovery, Stream, and share a constantly expanding mix of music
              from emerging and major artists around the world
            </h3>
          </div>
        </div>
      </header>
      <LoginModal switchModal={switchModalToggle} modalStat={modalLogin} modalClose={loginModalToggle} />
      <RegistrationModal switchModal={switchModalToggle} modalStat={modalRegist} modalClose={registModalToggle} />
    </>
  )
}

export default Header
