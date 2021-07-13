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
              <div className="nav-item">
                <img src="/add-music.png" alt="..." />
                <h4>Add Music</h4>
              </div>
            </Link>
            <Link to="/add-artist">
              <div className="nav-item">
                <img src="/add-artist.png" alt="..." />
                <h4>Add Artist</h4>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/payment">
            <div className="nav-item">
              <img src="/payment.png" alt="..." />
              <h4>Pay</h4>
            </div>
          </Link>
        )}
        <div className="nav-item logout" onClick={logout}>
          <img src="/logout.png" alt="..." />
          <h4>Logout</h4>
        </div>
      </div>
    </div>
  )
}

export default NavigationDropdown
