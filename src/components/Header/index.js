import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-sm-container">
        <li className="nav-list-item">
          <Link to="/" className="nav-link">
            <AiFillHome className="sm-icon" />
          </Link>
        </li>
        <li className="nav-list-item">
          <Link to="/jobs" className="nav-link">
            <BsBriefcaseFill className="sm-icon" />
          </Link>
        </li>
        <li className="nav-list-item">
          <button
            className="logout-btn-sm"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut className="sm-icon" />
          </button>
        </li>
      </ul>

      <div className="nav-lg-container">
        <Link to="/" className="nav-link-lg">
          Home
        </Link>
        <Link to="/jobs" className="nav-link-lg">
          Jobs
        </Link>
      </div>
      <button className="logout-btn-lg" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
