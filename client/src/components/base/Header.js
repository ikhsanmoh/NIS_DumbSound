import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext'

import { Link } from 'react-router-dom'

import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import Button from '../button/Button';
import RoundedImage from '../frame/RoundedImage';

import './Header.css';

const Header = () => {
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

  const dropDownClick = (e) => {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
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
            {state.isLogin ? (
              <div className="dropdown">
                <div className="dropdownbtn-wrapper">
                  <div onClick={dropDownClick} className="dropbtn">
                  </div>
                  <RoundedImage size='40px' />
                </div>
                <div id="myDropdown" className="dropdown-content">
                  <Link to="add-music">
                    <h4>Add Music</h4>
                  </Link>
                  <Link to="add-artist">
                    <h4>Add Artist</h4>
                  </Link>
                  <h4 className="logout" onClick={logout}>Logout</h4>
                </div>
              </div>
            ) : (
              <>
                <Button className="btn btn-login" text="Login" onClick={loginModalToggle} />
                <Button className="btn btn-register" text="Register" onClick={registModalToggle} />
              </>
            )
            }
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
