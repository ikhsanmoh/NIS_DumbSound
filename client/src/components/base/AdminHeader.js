import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext'

import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import Navbar from '../navigation/Navbar';

import './AdminHeader.css'

const AdminHeader = () => {
  const [state, dispatch] = useContext(UserContext)

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }

  return (
    <header className="admin">
      <div className="admin-header">
        <Navbar logout={logout} />
      </div>
    </header>
  )
}

export default AdminHeader
