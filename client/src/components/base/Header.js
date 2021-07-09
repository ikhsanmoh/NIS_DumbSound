import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext'

import { Link } from 'react-router-dom'

import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import Button from '../button/Button';
import RoundedImage from '../frame/RoundedImage';
import NavigationDropdown from '../dropdown/NavigationDropdown';
import Navbar from '../navigation/Navbar';

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

  const bg = {
    backgroundImage: 'url(/header-bg.png)'
  }

  return (
    <>
      <header className='header' style={bg}>
        <div className="header-top">
          <Navbar
            loginModalToggle={loginModalToggle}
            registModalToggle={registModalToggle}
            logout={logout}
          />
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

    // <>
    //   {state.isLogin && state.user.status === '1' ? (
    //     <header className="admin">
    //       <div className="admin-header">
    //         <Navbar logout={logout} />
    //       </div>
    //     </header>
    //   ) : (
    //     <>
    //       <header className='header' style={bg}>
    //         <div className="header-top">
    //           <Navbar
    //             loginModalToggle={loginModalToggle}
    //             registModalToggle={registModalToggle}
    //             logout={logout}
    //           />
    //         </div>
    //         <div className="header-body">
    //           <div className="text">
    //             <h1>Connect on DumbSound</h1>
    //             <h3>
    //               Discovery, Stream, and share a constantly expanding mix of music
    //               from emerging and major artists around the world
    //             </h3>
    //           </div>
    //         </div>
    //       </header>
    //       <LoginModal switchModal={switchModalToggle} modalStat={modalLogin} modalClose={loginModalToggle} />
    //       <RegistrationModal switchModal={switchModalToggle} modalStat={modalRegist} modalClose={registModalToggle} />
    //     </>
    //   )}
    // </>
  )
}

export default Header
