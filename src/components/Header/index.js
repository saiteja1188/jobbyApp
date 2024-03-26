import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-header-container">
        <div className="nav-content">
          <div className="nav-bar-logo-icon-container">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-lob"
              />
            </Link>
          </div>
          <ul className="nav-bar-mobile-icon-container">
            <li className="nav-bar-item">
              <Link to="/" className="nav-link">
                <AiFillHome className="icon" />
              </Link>
            </li>
            <li className="nav-bar-item">
              <Link to="/jobs" className="nav-link">
                <BsFillBriefcaseFill className="icon" />
              </Link>
            </li>
            <li className="nav-bar-item">
              <Link to="/login" className="nav-link">
                <FiLogOut className="icon" />
              </Link>
            </li>
          </ul>

          <div className="nav-bar-large-icon-container">
            <ul className="nav-bar-desktop-icon-container">
              <li className="nav-bar-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-bar-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
