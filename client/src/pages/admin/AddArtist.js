import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { API } from '../../config/api'


import Button from '../../components/button/Button'
import RoundedImage from '../../components/frame/RoundedImage';

import './AddArtist.css'

const AddArtist = () => {
  const [state, dispatch] = useContext(UserContext)
  const [name, setName] = useState('')
  const [old, setOld] = useState('')
  const [type, setType] = useState('')
  const [startCareer, setStartCareer] = useState('')

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      if (isNaN(old)) return alert('Old input must contain number.')
      const SUCCESS = 200
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const oldInt = +old
      const body = JSON.stringify({
        name,
        old: oldInt,
        type,
        startCareer
      })

      const response = await API.post("/artist", body, config)

      if (response.status === SUCCESS) {
        setName('')
        setOld('')
        setType('')
        setStartCareer('')

        alert('Artsit Added.')
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
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

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="logo">
          <img src="/ds-logo.png" alt="logo" />
        </div>
        <div className="option">
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
        </div>
      </div>

      <div className="form-wrapper">
        <div className="title">
          <h2>Add Artist</h2>
        </div>
        <div className="form">
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Old"
              value={old}
              onChange={e => setOld(e.target.value)}
              required
            />
            <select
              onChange={e => setType(e.target.value)}
            >
              <option value="" selected>Type</option>
              <option value="solo">Solo</option>
              <option value="band">Band</option>
            </select>
            <input
              type="text"
              placeholder="Start Career"
              value={startCareer}
              onChange={e => setStartCareer(e.target.value)}
              required
            />
            <div className="submit">
              <Button text='Add Artist' className="btn btn-submit" onClick={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddArtist
