import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'

import Button from '../button/Button';
import NavigationDropdown from '../dropdown/NavigationDropdown';

import './Navbar.css'

const Navbar = ({ logout, loginModalToggle, registModalToggle }) => {
  const [state, dispatch] = useContext(UserContext)

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/ds-logo.png" alt="logo" />
        </Link>
      </div>
      <div className="option">
        {state.isLogin ? (
          <NavigationDropdown logout={logout} />
        ) : (
          <>
            <Button className="btn btn-login" text="Login" onClick={loginModalToggle} />
            <Button className="btn btn-register" text="Register" onClick={registModalToggle} />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
