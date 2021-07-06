import Button from '../button/Button';

import './Header.css';

const Header = () => {
  const bg = {
    backgroundImage: 'url(/header-bg.png)'
  }

  return (
    <header className='header' style={bg}>
      <div className="header-top">
        <div className="logo">
          <img src="/ds-logo.png" alt="logo" />
        </div>
        <div className="option">
          <Button className="btn btn-login" text="Login" />
          <Button className="btn btn-register" text="Register" />
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
  )
}

export default Header
