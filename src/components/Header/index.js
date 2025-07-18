import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const LogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div>
      <div className="navbar-con">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul>
        <div className="home-jobs">
          <Link to="/">
            <li className="home-text">Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
        </div>
        <button type="button" onClick={LogOut} className="logout-btn">
         <li>Logout</li>
        </button>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
