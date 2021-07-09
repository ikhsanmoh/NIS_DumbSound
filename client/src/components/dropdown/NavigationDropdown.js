import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'

import RoundedImage from '../frame/RoundedImage';

import './NavigationDropdown.css'

const NavigationDropdown = ({ logout }) => {
  const [state, dispatch] = useContext(UserContext)

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
    <div className="dropdown">
      <div className="dropdownbtn-wrapper">
        <div onClick={dropDownClick} className="dropbtn">
        </div>
        <RoundedImage size='40px' />
      </div>
      <div id="myDropdown" className="dropdown-content">
        {state.user.status === '1' ? (
          <>
            <Link to="/add-music">
              <h4>Add Music</h4>
            </Link>
            <Link to="/add-artist">
              <h4>Add Artist</h4>
            </Link>
          </>
        ) : (
          <Link to="/payment">
            <h4>Pay</h4>
          </Link>
        )}
        <h4 className="logout" onClick={logout}>Logout</h4>
      </div>
    </div>
  )
}

export default NavigationDropdown
